import { Keypair } from '@solana/web3.js';

// TODO: Gerçek uygulamada Mobile Wallet Adapter ile Phantom/Backpack bağlantısı yapılmalı
// Şimdilik demo amaçlı local keypair döndürülüyor

export async function connectWallet() {
  // Burada gerçek cüzdan bağlantısı kodu olmalı
  // Örneğin: MobileWalletAdapter ile bağlantı
  // Şimdilik demo amaçlı random keypair
  return Keypair.generate();
}

export async function getWalletAddress(wallet: any) {
  return wallet.publicKey.toBase58();
} 