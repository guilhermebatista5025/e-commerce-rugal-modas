import { createClient } from '@supabase/supabase-js';

const url = 'https://llcoewtsjnslrhoelglj.supabase.co/';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsY29ld3Rzam5zbHJob2VsZ2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NDUwMjQsImV4cCI6MjA5NDAyMTAyNH0.k7P6qIGn-S39dcZFLOEYLmOF1uDuK_TReMRoQNauSV4';

const supabase = createClient(url, key);

async function checkProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, skus(*)');

  if (error) {
    console.error('ERRO:', error.message);
  } else {
    console.log('Total de produtos no banco:', data.length);
    data.forEach(p => {
      console.log(`Produto: ${p.name}, SKUs: ${p.skus.length}`);
    });
  }
}

checkProducts();
