-- 1. Fix public exposure of author_email / author_phone in porter_messages.
-- Remove the public SELECT policy and expose only safe columns via a SECURITY DEFINER function.
DROP POLICY IF EXISTS "Anyone can view approved messages" ON public.porter_messages;

CREATE OR REPLACE FUNCTION public.get_public_porter_messages()
RETURNS TABLE(
  id uuid,
  author_name text,
  message text,
  admin_response text,
  is_featured boolean,
  created_at timestamptz
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT id, author_name, message, admin_response, is_featured, created_at
  FROM public.porter_messages
  WHERE is_approved = true
  ORDER BY is_featured DESC, created_at DESC;
$$;

-- 2. Fix public exposure of rater_email in porter_ratings.
DROP POLICY IF EXISTS "Anyone can view published ratings" ON public.porter_ratings;

CREATE OR REPLACE FUNCTION public.get_public_porter_ratings(porter_id uuid)
RETURNS TABLE(
  id uuid,
  rater_name text,
  rating integer,
  review text,
  mountain text,
  expedition_date date,
  created_at timestamptz
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT id, rater_name, rating, review, mountain, expedition_date, created_at
  FROM public.porter_ratings
  WHERE porter_ratings.porter_id = get_public_porter_ratings.porter_id
    AND is_published = true
  ORDER BY created_at DESC;
$$;

-- 3. Allow corporate members to read their own registration record.
CREATE POLICY "Corporate members can view their own record"
ON public.members_corporate
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 4. Allow honorary members to read their own registration record.
CREATE POLICY "Honorary members can view their own record"
ON public.members_honorary
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);