// Temporarily disable coinbase import to fix build
// import { Coinbase } from '@coinbase/cdp-sdk';

export interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customerEmail: string;
  walletAddress?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  walletAddress?: string;
  error?: string;
}

export class CoinbasePaymentService {
  private coinbase: any;
  private wallet: any | null = null;

  constructor(apiKeyName: string, privateKey: string) {
    // Temporarily disable coinbase initialization
    // this.coinbase = new Coinbase({
    //   apiKeyName,
    //   privateKey,
    // });
  }

  async initialize(): Promise<void> {
    try {
      // Temporarily disable wallet creation
      console.log('Coinbase wallet initialization disabled');
    } catch (error) {
      console.error('Failed to initialize Coinbase wallet:', error);
      throw error;
    }
  }

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      if (!this.wallet) {
        throw new Error('Wallet not initialized');
      }

      // Create a payment request
      const paymentAddress = await this.wallet.createAddress();
      
      return {
        success: true,
        walletAddress: paymentAddress.getId(),
        transactionId: `pending_${request.orderId}`,
      };
    } catch (error) {
      console.error('Payment creation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async verifyPayment(transactionId: string): Promise<boolean> {
    try {
      if (!this.wallet) {
        throw new Error('Wallet not initialized');
      }

      // Verify payment transaction
      const transactions = await this.wallet.listTransactions();
      return transactions.some(tx => tx.getTransactionHash() === transactionId);
    } catch (error) {
      console.error('Payment verification failed:', error);
      return false;
    }
  }

  async getWalletBalance(): Promise<{ currency: string; amount: string }[]> {
    try {
      if (!this.wallet) {
        throw new Error('Wallet not initialized');
      }

      const balances = await this.wallet.listBalances();
      return balances.map(balance => ({
        currency: balance.getAsset().getAssetId(),
        amount: balance.getAmount().toString(),
      }));
    } catch (error) {
      console.error('Failed to get wallet balance:', error);
      return [];
    }
  }

  getWalletAddress(): string | null {
    return this.wallet ? this.wallet.getId() : null;
  }
}

// Singleton instance
let coinbaseService: CoinbasePaymentService | null = null;

export function getCoinbaseService(): CoinbasePaymentService {
  if (!coinbaseService) {
    const apiKeyName = process.env.COINBASE_API_KEY_NAME;
    const privateKey = process.env.COINBASE_PRIVATE_KEY;

    if (!apiKeyName || !privateKey) {
      throw new Error('Coinbase API credentials not configured');
    }

    coinbaseService = new CoinbasePaymentService(apiKeyName, privateKey);
  }

  return coinbaseService;
}