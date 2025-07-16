import type { APIRoute } from 'astro';
import { getCoinbaseService, type PaymentRequest } from '../../../lib/coinbase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { amount, currency, orderId, customerEmail, walletAddress } = body;

    // Validate required fields
    if (!amount || !currency || !orderId || !customerEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: amount, currency, orderId, customerEmail',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Initialize Coinbase service
    const coinbaseService = getCoinbaseService();
    await coinbaseService.initialize();

    // Create payment request
    const paymentRequest: PaymentRequest = {
      amount: parseFloat(amount),
      currency,
      orderId,
      customerEmail,
      walletAddress,
    };

    const result = await coinbaseService.createPayment(paymentRequest);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};