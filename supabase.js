const SUPABASE_URL = "https://vxmmdrjlblvxobyxhnmq.supabase.co";
const SUPABASE_KEY = "sb_publishable_GmNQvQmE-xrVAqpvB-BFdA_O-rBDKOq";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

window.supabaseClient = supabase;
