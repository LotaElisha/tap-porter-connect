-- Add 'member' role to app_role enum
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'member';

-- Link members to auth users
ALTER TABLE members_porters ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE members_corporate ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE members_honorary ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Create porter_ratings table
CREATE TABLE public.porter_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  porter_id UUID REFERENCES members_porters(id) ON DELETE CASCADE NOT NULL,
  rater_name TEXT NOT NULL,
  rater_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  expedition_date DATE,
  mountain TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on porter_ratings
ALTER TABLE public.porter_ratings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for porter_ratings
CREATE POLICY "Anyone can submit ratings" ON public.porter_ratings
FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view published ratings" ON public.porter_ratings
FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage ratings" ON public.porter_ratings
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at on porter_ratings
CREATE TRIGGER update_porter_ratings_updated_at
BEFORE UPDATE ON public.porter_ratings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add average_rating column to members_porters for quick lookups
ALTER TABLE members_porters ADD COLUMN IF NOT EXISTS average_rating DECIMAL(2,1) DEFAULT 0;
ALTER TABLE members_porters ADD COLUMN IF NOT EXISTS total_ratings INTEGER DEFAULT 0;

-- RLS policy updates: Allow anyone to view active porters
CREATE POLICY "Anyone can view active porters" ON public.members_porters
FOR SELECT USING (status = 'active');

-- Allow members to update their own porter profile
CREATE POLICY "Members can update own porter profile" ON public.members_porters
FOR UPDATE USING (auth.uid() = user_id);