import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://llcoewtsjnslrhoelglj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsY29ld3Rzam5zbHJob2VsZ2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NDUwMjQsImV4cCI6MjA5NDAyMTAyNH0.k7P6qIGn-S39dcZFLOEYLmOF1uDuK_TReMRoQNauSV4'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testAuth() {
  console.log("Testando Login...");
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'bern1822@outlook.com',
    password: '95570806mb@'
  });

  if (error) {
    console.error("ERRO NO LOGIN:", error.message);
  } else {
    console.log("LOGIN BEM SUCEDIDO:", data.user.id);
  }
}

testAuth();
