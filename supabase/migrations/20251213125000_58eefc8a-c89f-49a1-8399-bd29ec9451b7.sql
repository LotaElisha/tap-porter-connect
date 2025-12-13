-- Create porter_messages table for moderated community chat
CREATE TABLE public.porter_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_email TEXT,
  author_phone TEXT,
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  admin_response TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.porter_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a message
CREATE POLICY "Anyone can submit messages"
ON public.porter_messages
FOR INSERT
WITH CHECK (true);

-- Only approved messages visible to public
CREATE POLICY "Anyone can view approved messages"
ON public.porter_messages
FOR SELECT
USING (is_approved = true);

-- Admins can view all messages
CREATE POLICY "Admins can view all messages"
ON public.porter_messages
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can manage messages
CREATE POLICY "Admins can manage messages"
ON public.porter_messages
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger
CREATE TRIGGER update_porter_messages_updated_at
BEFORE UPDATE ON public.porter_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();