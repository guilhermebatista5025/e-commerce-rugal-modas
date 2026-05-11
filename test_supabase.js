import { createClient } from '@supabase/supabase-js';

const url = 'https://llcoewtsjnslrhoelglj.supabase.co/';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsY29ld3Rzam5zbHJob2VsZ2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NDUwMjQsImV4cCI6MjA5NDAyMTAyNH0.k7P6qIGn-S39dcZFLOEYLmOF1uDuK_TReMRoQNauSV4';

const supabase = createClient(url, key);

async function test() {
  const { data, error } = await supabase.auth.signUp({
    email: 'test' + Date.now() + '@gmail.com',
    password: 'password123',
    options: { data: { full_name: 'Test User' } }
  });
  if (error) {
    console.error('ERRO:', error.message);
  } else {
    console.log('SUCESSO:', data.user.email);
  }
}
test();
