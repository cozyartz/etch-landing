import type { APIRoute } from 'astro';
import { getCoinbaseService } from '../../../lib/coinbase';

export interface OrderRequest {
  walletAddress: string;
  nftName: string;
  nftImage?: string;
  collection?: string;
  tokenId?: string;
  contractAddress?: string;
  paymentMethod: 'coinbase' | 'crypto' | 'other';
  network: string;
  priceUsd: number;
  fullName: string;
  email: string;
  addressLine: string;
  city: string;
  country: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const {
      walletAddress,
      nftName,
      nftImage,
      collection,
      tokenId,
      contractAddress,
      paymentMethod,
      network,
      priceUsd,
      fullName,
      email,
      addressLine,
      city,
      country,
    } = body as OrderRequest;

    // Validate required fields
    if (!walletAddress || !nftName || !paymentMethod || !priceUsd || !fullName || !email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Generate order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2)}`;

    // If payment method is Coinbase, create payment request
    let paymentResponse = null;
    if (paymentMethod === 'coinbase') {
      try {
        const coinbaseService = getCoinbaseService();
        await coinbaseService.initialize();
        
        paymentResponse = await coinbaseService.createPayment({
          amount: priceUsd,
          currency: 'USD',
          orderId,
          customerEmail: email,
          walletAddress,
        });

        if (!paymentResponse.success) {
          return new Response(
            JSON.stringify({
              success: false,
              error: `Payment creation failed: ${paymentResponse.error}`,
            }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
        }
      } catch (error) {
        console.error('Coinbase payment error:', error);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Failed to create Coinbase payment',
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }

    // Insert order into database
    const db = locals.runtime?.env?.DB;
    if (!db) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Database not available',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const insertResult = await db
      .prepare(
        `INSERT INTO orders (
          id, wallet_address, nft_name, nft_image, collection, token_id, 
          contract_address, payment_method, network, tx_hash, price_usd, 
          full_name, email, address_line, city, country, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        orderId,
        walletAddress,
        nftName,
        nftImage,
        collection,
        tokenId,
        contractAddress,
        paymentMethod,
        network,
        paymentResponse?.transactionId || null,
        priceUsd,
        fullName,
        email,
        addressLine,
        city,
        country,
        'pending'
      )
      .run();

    if (!insertResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to create order',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId,
        paymentAddress: paymentResponse?.walletAddress,
        transactionId: paymentResponse?.transactionId,
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    
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