-- Contact submissions
ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_name_len CHECK (char_length(name) BETWEEN 2 AND 100),
  ADD CONSTRAINT contact_email_fmt CHECK (char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT contact_subject_len CHECK (subject IS NULL OR char_length(subject) <= 200),
  ADD CONSTRAINT contact_message_len CHECK (char_length(message) BETWEEN 10 AND 2000);

-- Email subscribers
ALTER TABLE public.email_subscribers
  ADD CONSTRAINT subscriber_email_fmt CHECK (char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

-- Porter messages
ALTER TABLE public.porter_messages
  ADD CONSTRAINT pm_author_name_len CHECK (char_length(author_name) BETWEEN 2 AND 100),
  ADD CONSTRAINT pm_message_len CHECK (char_length(message) BETWEEN 5 AND 2000),
  ADD CONSTRAINT pm_email_len CHECK (author_email IS NULL OR char_length(author_email) <= 255),
  ADD CONSTRAINT pm_phone_len CHECK (author_phone IS NULL OR char_length(author_phone) <= 30);

-- Porter ratings
ALTER TABLE public.porter_ratings
  ADD CONSTRAINT pr_rating_range CHECK (rating BETWEEN 1 AND 5);

-- Members porters
ALTER TABLE public.members_porters
  ADD CONSTRAINT mp_full_name_len CHECK (char_length(full_name) BETWEEN 2 AND 100),
  ADD CONSTRAINT mp_phone_len CHECK (char_length(phone) BETWEEN 5 AND 30),
  ADD CONSTRAINT mp_email_fmt CHECK (email IS NULL OR (char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')),
  ADD CONSTRAINT mp_national_id_len CHECK (national_id IS NULL OR char_length(national_id) <= 50);

-- Members corporate
ALTER TABLE public.members_corporate
  ADD CONSTRAINT mc_company_name_len CHECK (char_length(company_name) BETWEEN 2 AND 150),
  ADD CONSTRAINT mc_contact_person_len CHECK (char_length(contact_person) BETWEEN 2 AND 100),
  ADD CONSTRAINT mc_contact_email_fmt CHECK (char_length(contact_email) <= 255 AND contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT mc_contact_phone_len CHECK (char_length(contact_phone) BETWEEN 5 AND 30);

-- Members honorary
ALTER TABLE public.members_honorary
  ADD CONSTRAINT mh_full_name_len CHECK (char_length(full_name) BETWEEN 2 AND 100),
  ADD CONSTRAINT mh_email_fmt CHECK (char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');