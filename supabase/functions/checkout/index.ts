// supabase/functions/checkout/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // 1. Trata CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { items, customer } = await req.json();

    // Validação básica de entrada
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('O carrinho está vazio.');
    }

    // 2. Inicializa o cliente com SERVICE_ROLE para bypassar RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Configurações do Supabase não encontradas.');
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    let totalAmount = 0;
    const validatedItems = [];

    // 3. Validação de cada item no banco de dados
    for (const item of items) {
      // Divide a chave "id-tamanho" (ex: "uuid-M")
      if (!item.key || !item.key.includes('-')) {
        throw new Error(`Formato de item inválido: ${item.product?.name || 'Item desconhecido'}`);
      }

      const parts = item.key.split('-');
      const size = parts.pop(); // Pega o último elemento (tamanho)
      const productId = parts.join('-'); // O resto é o ID (caso o ID tenha hífens)

      const { data: skuData, error: skuError } = await supabaseClient
        .from('skus')
        .select('id, price, promo_price, is_promo, stock')
        .eq('product_id', productId)
        .eq('size', size)
        .single();

      if (skuError || !skuData) {
        console.error(`Erro SKU:`, skuError);
        throw new Error(`Produto ou tamanho não encontrado: ${item.product?.name} (${size})`);
      }

      if (skuData.stock < item.qty) {
        throw new Error(`Estoque insuficiente para ${item.product?.name}. Restam apenas ${skuData.stock} unidades.`);
      }

      const currentPrice = skuData.is_promo ? skuData.promo_price : skuData.price;
      totalAmount += currentPrice * item.qty;

      validatedItems.push({
        sku_id: skuData.id,
        quantity: item.qty,
        price_at_purchase: currentPrice
      });
    }

    // 4. Criação do Pedido
    // Nota: Recomendo adicionar colunas de customer_name/address na tabela 'orders' futuramente
    const { data: orderData, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        total_amount: totalAmount,
        status: 'pending',
        // Opcional: Você pode salvar os dados do cliente em um JSONB ou colunas específicas aqui
      })
      .select('id')
      .single();

    if (orderError || !orderData) {
      throw new Error(`Erro ao criar pedido: ${orderError?.message}`);
    }

    // 5. Inserção dos Itens do Pedido
    const orderItemsToInsert = validatedItems.map(vi => ({
      order_id: orderData.id,
      sku_id: vi.sku_id,
      quantity: vi.quantity,
      price_at_purchase: vi.price_at_purchase
    }));

    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(orderItemsToInsert);

    if (itemsError) {
      throw new Error(`Erro ao inserir itens: ${itemsError.message}`);
    }

    // 6. Resposta de Sucesso
    return new Response(
      JSON.stringify({ 
        message: 'Pedido criado com sucesso!', 
        total_amount: totalAmount,
        order_id: orderData.id,
        payment_link: "https://checkout.exemplo.com/" + orderData.id // Substituir pela integração real
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 200 
      }
    );

  } catch (error: any) {
    console.error("Checkout Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || 'Erro interno no servidor' }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 400 
      }
    );
  }
});
