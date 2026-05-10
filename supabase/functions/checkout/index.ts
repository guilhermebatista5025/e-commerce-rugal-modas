// supabase/functions/checkout/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Trata a requisição CORS (Preflight) enviada pelos navegadores
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { items, customer } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Carrinho vazio.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // Inicializa o cliente do Supabase com a SERVICE_ROLE_KEY.
    // Isso é essencial pois o backend precisa de poderes administrativos para consultar o banco e bypassar o RLS.
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    let totalAmount = 0;
    const validatedItems = [];

    // Regra de Ouro: O backend recalcula e valida o preço/estoque de cada item.
    for (const item of items) {
      // Como estamos enviando a "key" no formato "product_id-size", vamos extrair.
      // O ideal no futuro (após você cadastrar os dados no Supabase) é já enviar apenas o sku_id.
      const [productId, size] = item.key.split('-');

      const { data: skuData, error: skuError } = await supabaseClient
        .from('skus')
        .select('id, price, promo_price, is_promo, stock')
        .eq('product_id', productId)
        .eq('size', size)
        .single();

      if (skuError || !skuData) {
        throw new Error(`SKU não encontrado para o produto ${productId} e tamanho ${size}.`);
      }

      // Validação de Estoque Dinâmico
      if (skuData.stock < item.qty) {
        throw new Error(`Estoque insuficiente para o tamanho ${size}. Temos apenas ${skuData.stock} unidade(s).`);
      }

      // Validação de Preço (Evita que o frontend forje preços)
      const currentPrice = skuData.is_promo ? skuData.promo_price : skuData.price;
      totalAmount += currentPrice * item.qty;

      validatedItems.push({
        sku_id: skuData.id,
        quantity: item.qty,
        price_at_purchase: currentPrice
      });
    }

    // TODO: Consultar API de Frete (Ex: Melhor Envio / Correios) e somar em totalAmount.

    // Criar o Pedido no Banco de Dados (Status: pending)
    const { data: orderData, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        total_amount: totalAmount,
        status: 'pending',
        // user_id: (aqui você poderia extrair o user_id do JWT caso a loja exija login)
      })
      .select('id')
      .single();

    if (orderError) throw orderError;

    // Inserir os Itens relacionados ao Pedido
    const orderItemsToInsert = validatedItems.map(vi => ({
      order_id: orderData.id,
      sku_id: vi.sku_id,
      quantity: vi.quantity,
      price_at_purchase: vi.price_at_purchase
    }));

    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(orderItemsToInsert);

    if (itemsError) throw itemsError;

    // TODO: Gerar intenção de pagamento no Stripe / MercadoPago usando o totalAmount real.
    const paymentLink = "https://link-de-pagamento-ficticio.com/checkout/123";

    return new Response(
      JSON.stringify({ 
        message: 'Checkout processado com segurança no servidor.', 
        total_amount: totalAmount,
        order_id: orderData.id,
        payment_link: paymentLink 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
