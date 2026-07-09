DROP POLICY IF EXISTS "Porters can view own full profile" ON public.members_porters;
CREATE POLICY "Porters can view own full profile"
ON public.members_porters
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Members can update own porter profile" ON public.members_porters;
CREATE POLICY "Members can update own porter profile"
ON public.members_porters
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);