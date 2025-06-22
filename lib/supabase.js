import { createClient } from '@supabase/supabase-js';

const EXPO_PUBLIC_SUPABASE_URL= 'https://vrvmgoxzbzkrewsclqdb.supabase.co'
const EXPO_PUBLIC_SUPABASE_ANON_KEY= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydm1nb3h6YnprcmV3c2NscWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MjE3ODksImV4cCI6MjA2NjE5Nzc4OX0.uxUNeoFHCfGl-ZU8XRAwdyODwoweexpRifuvtGmVHzU'

const supabase = createClient(EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY);

export default supabase;