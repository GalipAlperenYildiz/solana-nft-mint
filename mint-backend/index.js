const express = require('express');
const bodyParser = require('body-parser');
const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');
const { Metaplex, keypairIdentity } = require('@metaplex-foundation/js');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const connection = new Connection(clusterApiUrl('devnet'));
const secret = JSON.parse(process.env.SERVICE_WALLET_SECRET); // [.., .., ..]
const wallet = Keypair.fromSecretKey(Uint8Array.from(secret));
const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet));

app.post('/mint', async (req, res) => {
  try {
    const { metadataUri, name } = req.body;
    if (!metadataUri) return res.status(400).json({ error: 'metadataUri required' });

    const { nft, response } = await metaplex.nfts().create({
      uri: metadataUri,
      name: name || 'Solana NFT',
      sellerFeeBasisPoints: 500,
      symbol: '',
      maxSupply: 1,
    });

    res.json({
      mintAddress: nft.address.toBase58(),
      txId: response.signature,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Mint backend running on port ${PORT}`));