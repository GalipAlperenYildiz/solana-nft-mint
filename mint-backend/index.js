const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');
const { Metaplex, keypairIdentity } = require('@metaplex-foundation/js');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Solana connection setup
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Check if environment variables are set
if (!process.env.SERVICE_WALLET_SECRET) {
  console.error('SERVICE_WALLET_SECRET environment variable is required!');
  console.error('Please create a .env file with your wallet secret key.');
  process.exit(1);
}

const secret = JSON.parse(process.env.SERVICE_WALLET_SECRET);
const wallet = Keypair.fromSecretKey(Uint8Array.from(secret));
const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet));

console.log('Wallet public key:', wallet.publicKey.toBase58());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    wallet: wallet.publicKey.toBase58(),
    network: 'devnet'
  });
});

// Mint NFT endpoint
app.post('/mint', async (req, res) => {
  try {
    const { metadataUri, name, imageUrl } = req.body;
    
    if (!metadataUri) {
      return res.status(400).json({ 
        error: 'metadataUri is required' 
      });
    }

    console.log('Mock NFT minting with metadata:', { metadataUri, name, imageUrl });

    // Mock NFT mint işlemi
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 saniye bekle

    // Mock NFT adresi ve işlem hash'i oluştur
    const mockMintAddress = 'NFT' + Math.random().toString(36).substring(2, 15).toUpperCase();
    const mockTxId = 'tx' + Math.random().toString(36).substring(2, 15);

    console.log('Mock NFT minted successfully:', {
      mintAddress: mockMintAddress,
      txId: mockTxId
    });

    res.json({
      success: true,
      mintAddress: mockMintAddress,
      txId: mockTxId,
      name: name || 'Solana NFT',
      metadataUri: metadataUri,
      isMock: true // Mock olduğunu belirt
    });

  } catch (error) {
    console.error('Mock mint error:', error);
    res.status(500).json({ 
      error: error.message || 'Mock minting failed',
      details: error.toString()
    });
  }
});

// Get wallet balance
app.get('/balance', async (req, res) => {
  try {
    // Mock balance for testing
    const mockBalance = 2.5; // 2.5 SOL for testing
    res.json({ 
      balance: mockBalance,
      address: wallet.publicKey.toBase58()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Mint backend running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
  console.log(`💰 Balance check: http://localhost:${PORT}/balance`);
});