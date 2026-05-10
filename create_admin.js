import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://llcoewtsjnslrhoelglj.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsY29ld3Rzam5zbHJob2VsZ2xqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODQ0NTAyNCwiZXhwIjoyMDk0MDIxMDI0fQ.OeMQR3qb2lp0Ug6yI3dAVtVPfmFz8UQKtaxH6gWALLo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function createAdmin() {
  console.log("Criando usuário admin...");
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@rugal.com',
    password: 'admin123',
    email_confirm: true, // Já cria confirmado (ignora verificação)
    user_metadata: { full_name: 'Admin Rugal' }
  });

  if (error) {
    console.error("ERRO:", error.message);
  } else {
    console.log("SUCESSO! Admin criado:", data.user.id);
  }
}

createAdmin();
