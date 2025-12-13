-- Create enum for membership types
CREATE TYPE public.membership_status AS ENUM ('pending', 'active', 'expired', 'suspended');
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- User roles table for admin access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Porter members table
CREATE TABLE public.members_porters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  national_id TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  region TEXT,
  district TEXT,
  years_experience INTEGER DEFAULT 0,
  certifications TEXT[],
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  profile_photo_url TEXT,
  status membership_status DEFAULT 'pending',
  membership_number TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.members_porters ENABLE ROW LEVEL SECURITY;

-- Corporate members table
CREATE TABLE public.members_corporate (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  company_type TEXT NOT NULL,
  registration_number TEXT,
  contact_person TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  address TEXT,
  website TEXT,
  number_of_porters INTEGER DEFAULT 0,
  services_offered TEXT[],
  logo_url TEXT,
  status membership_status DEFAULT 'pending',
  membership_number TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.members_corporate ENABLE ROW LEVEL SECURITY;

-- Honorary/Support members table
CREATE TABLE public.members_honorary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT,
  member_type TEXT NOT NULL,
  full_name TEXT NOT NULL,
  title TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  affiliation TEXT,
  area_of_expertise TEXT,
  reason_for_joining TEXT,
  status membership_status DEFAULT 'pending',
  membership_number TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.members_honorary ENABLE ROW LEVEL SECURITY;

-- News articles table
CREATE TABLE public.news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  category TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Porter stories table
CREATE TABLE public.porter_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  porter_name TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  story TEXT NOT NULL,
  porter_photo_url TEXT,
  years_as_porter INTEGER,
  mountain TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.porter_stories ENABLE ROW LEVEL SECURITY;

-- Gallery items table
CREATE TABLE public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  category TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Partners table
CREATE TABLE public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  partner_type TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Email subscribers table
CREATE TABLE public.email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- User roles: only admins can view
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Profiles: users can view their own, admins can view all
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Porter members: public insert, admin view/manage
CREATE POLICY "Anyone can register as porter"
  ON public.members_porters FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all porter members"
  ON public.members_porters FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage porter members"
  ON public.members_porters FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Corporate members: public insert, admin view/manage
CREATE POLICY "Anyone can register as corporate member"
  ON public.members_corporate FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all corporate members"
  ON public.members_corporate FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage corporate members"
  ON public.members_corporate FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Honorary members: public insert, admin view/manage
CREATE POLICY "Anyone can register as honorary member"
  ON public.members_honorary FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all honorary members"
  ON public.members_honorary FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage honorary members"
  ON public.members_honorary FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- News articles: public read published, admin manage
CREATE POLICY "Anyone can view published news"
  ON public.news_articles FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage news"
  ON public.news_articles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Porter stories: public read published, admin manage
CREATE POLICY "Anyone can view published stories"
  ON public.porter_stories FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage stories"
  ON public.porter_stories FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Gallery: public read published, admin manage
CREATE POLICY "Anyone can view published gallery items"
  ON public.gallery_items FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage gallery"
  ON public.gallery_items FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Partners: public read, admin manage
CREATE POLICY "Anyone can view partners"
  ON public.partners FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage partners"
  ON public.partners FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Contact submissions: public insert, admin view
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage contact submissions"
  ON public.contact_submissions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Email subscribers: public insert, admin view
CREATE POLICY "Anyone can subscribe"
  ON public.email_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view subscribers"
  ON public.email_subscribers FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create profile trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_members_porters_updated_at
  BEFORE UPDATE ON public.members_porters
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_members_corporate_updated_at
  BEFORE UPDATE ON public.members_corporate
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_members_honorary_updated_at
  BEFORE UPDATE ON public.members_honorary
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_news_articles_updated_at
  BEFORE UPDATE ON public.news_articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_porter_stories_updated_at
  BEFORE UPDATE ON public.porter_stories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();