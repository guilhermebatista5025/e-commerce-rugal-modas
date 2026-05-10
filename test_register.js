import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://llcoewtsjnslrhoelglj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsY29ld3Rzam5zbHJob2VsZ2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NDUwMjQsImV4cCI6MjA5NDAyMTAyNH0.k7P6qIGn-S39dcZFLOEYLmOF1uDuK_TReMRoQNauSV4'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testRegister() {
  console.log("Testando Cadastro...");
  const { data, error } = await supabase.auth.signUp({
    email: 'testagent@rugal.com',
    password: 'password123',
    options: { data: { full_name: 'Test Agent' } }
  });

  if (error) {
    console.error("ERRO NO CADASTRO:", error.message);
  } else {
    console.log("CADASTRO BEM SUCEDIDO:", data.user?.id);
    console.log("Identities length:", data.user?.identities?.length);
  }
}

testRegister();
