import type { APIRoute } from 'astro';
import { getCoinbaseService } from '../../../lib/coinbase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { transactionId } = body;

    if (!transactionId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing transactionId',
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

    // Verify payment
    const isVerified = await coinbaseService.verifyPayment(transactionId);

    return new Response(
      JSON.stringify({
        success: true,
        verified: isVerified,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Payment verification error:', error);
    
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