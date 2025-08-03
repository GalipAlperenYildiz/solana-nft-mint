# Solana NFT Mint Backend

Bu backend servisi Solana blockchain'de NFT mint işlemlerini gerçekleştirir.

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. `.env` dosyası oluşturun:
```bash
# Solana wallet secret key (array format)
SERVICE_WALLET_SECRET=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64]

# Server port (optional, defaults to 3001)
PORT=3001
```

3. Servisi başlatın:
```bash
npm start
```

## API Endpoints

### POST /mint
NFT mint işlemi gerçekleştirir.

**Request Body:**
```json
{
  "metadataUri": "https://ipfs.io/ipfs/...",
  "name": "NFT Name",
  "imageUrl": "https://ipfs.io/ipfs/..."
}
```

**Response:**
```json
{
  "success": true,
  "mintAddress": "ABC123...",
  "txId": "DEF456...",
  "name": "NFT Name",
  "metadataUri": "https://ipfs.io/ipfs/..."
}
```

### GET /health
Servis durumunu kontrol eder.

### GET /balance
Wallet bakiyesini gösterir.

## Notlar

- Servis Solana Devnet'te çalışır
- NFT mint işlemleri için SOL gereklidir
- Wallet secret key'i güvenli bir şekilde saklayın 