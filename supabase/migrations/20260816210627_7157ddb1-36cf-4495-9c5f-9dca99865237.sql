CREATE TABLE public.discovery_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  agency_name TEXT NOT NULL,
  role TEXT,
  agency_website TEXT,
  primary_challenge TEXT NOT NULL,
  additional_context TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.discovery_requests TO anon, authenticated;
GRANT ALL ON public.discovery_requests TO service_role;
ALTER TABLE public.discovery_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a discovery request" ON public.discovery_requests FOR INSERT TO anon, authenticated WITH CHECK (true);