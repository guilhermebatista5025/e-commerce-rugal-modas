import { createClient } from '@supabase/supabase-js';
import { products } from './src/data/products.js';

// === CONFIGURAÇÃO SUPABASE ===
// Cole aqui as suas credenciais para rodar o script.
// ATENÇÃO: Você DEVE usar a "service_role key" (que também começa com eyJ) 
// encontrada em Project Settings > API. A "anon key" não tem permissão para inserir produtos (devido ao RLS).
const SUPABASE_URL = 'https://llcoewtsjnslrhoelglj.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsY29ld3Rzam5zbHJob2VsZ2xqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODQ0NTAyNCwiZXhwIjoyMDk0MDIxMDI0fQ.OeMQR3qb2lp0Ug6yI3dAVtVPfmFz8UQKtaxH6gWALLo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
  console.log('🚀 Iniciando a migração de dados...');

  if (SUPABASE_SERVICE_ROLE_KEY === 'COLE_SUA_SERVICE_ROLE_KEY_AQUI') {
    console.error('❌ ERRO: Você esqueceu de colar a sua SUPABASE_SERVICE_ROLE_KEY no arquivo seed.js!');
    process.exit(1);
  }

  for (const prod of products) {
    console.log(`\n📦 Processando Produto: ${prod.name}`);

    // Passo 1: Inserir o Produto
    const { data: productData, error: productError } = await supabase
      .from('products')
      .insert({
        code: prod.code,
        name: prod.name,
        description: prod.description,
        brand: prod.brand,
        category: prod.category,
        image_url: prod.image,
      })
      .select()
      .single();

    if (productError) {
      console.error(`❌ Erro ao inserir produto ${prod.name}:`, productError.message);
      // Se der erro de "code" duplicado, por exemplo, ele pula para o próximo
      continue;
    }

    const productId = productData.id;
    console.log(`✅ Produto criado com ID: ${productId}`);

    // Passo 2: Inserir os SKUs (Variações e Estoque)
    const skusToInsert = [];

    // O seu mock armazena os tamanhos no array "sizes" e o estoque no objeto "stock"
    if (prod.sizes && prod.sizes.length > 0) {
      for (const size of prod.sizes) {
        const stockQty = prod.stock ? (prod.stock[size] || 0) : 0;

        skusToInsert.push({
          product_id: productId,
          size: size,
          stock: stockQty,
          price: prod.price,
          promo_price: prod.promoPrice || null,
          is_promo: prod.promo || false
        });
      }
    } else {
      // Produto de tamanho único (fallback)
      skusToInsert.push({
        product_id: productId,
        size: 'Único',
        stock: 5,
        price: prod.price,
        promo_price: prod.promoPrice || null,
        is_promo: prod.promo || false
      });
    }

    const { error: skusError } = await supabase
      .from('skus')
      .insert(skusToInsert);

    if (skusError) {
      console.error(`❌ Erro ao inserir SKUs do produto ${prod.name}:`, skusError.message);
    } else {
      console.log(`✅ ${skusToInsert.length} SKU(s) inserido(s) com sucesso.`);
    }
  }

  console.log('\n🎉 Migração finalizada com sucesso! Seus dados já estão no Supabase.');
}

seed();
