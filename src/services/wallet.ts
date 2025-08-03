import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

// Solana Devnet bağlantısı
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

export interface WalletInfo {
  publicKey: string;
  balance: number;
  connected: boolean;
}

export class WalletService {
  private static instance: WalletService;
  private walletInfo: WalletInfo = {
    publicKey: '',
    balance: 0,
    connected: false
  };

  static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  // Mock cüzdan bağlantısı (gerçek implementasyon için Mobile Wallet Adapter kullanılacak)
  async connectWallet(): Promise<WalletInfo> {
    try {
      // Mock wallet public key
      const mockPublicKey = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';
      
      // Mock balance
      const mockBalance = 2.5;

      this.walletInfo = {
        publicKey: mockPublicKey,
        balance: mockBalance,
        connected: true
      };

      console.log('Mock wallet connected:', this.walletInfo);
      return this.walletInfo;
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw error;
    }
  }

  // Cüzdan bilgilerini al
  getWalletInfo(): WalletInfo {
    return this.walletInfo;
  }

  // Bakiye güncelle
  async updateBalance(): Promise<number> {
    if (!this.walletInfo.connected) {
      return 0;
    }

    try {
      const publicKey = new PublicKey(this.walletInfo.publicKey);
      const balance = await connection.getBalance(publicKey);
      this.walletInfo.balance = balance / 1000000000; // Lamports to SOL
      return this.walletInfo.balance;
    } catch (error) {
      console.error('Balance update error:', error);
      return this.walletInfo.balance;
    }
  }

  // Cüzdan bağlantısını kes
  disconnect(): void {
    this.walletInfo = {
      publicKey: '',
      balance: 0,
      connected: false
    };
    console.log('Wallet disconnected');
  }

  // Cüzdan bağlı mı?
  isConnected(): boolean {
    return this.walletInfo.connected;
  }
}

export const walletService = WalletService.getInstance(); 