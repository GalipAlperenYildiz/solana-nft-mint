import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

// Solana Devnet bağlantısı
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

export interface NFTData {
  id: string;
  name: string;
  image: string;
  description: string;
  mintAddress: string;
  createdAt: string;
  owner: string;
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
}

export class NFTService {
  private static instance: NFTService;
  private cache: Map<string, NFTData> = new Map();

  static getInstance(): NFTService {
    if (!NFTService.instance) {
      NFTService.instance = new NFTService();
    }
    return NFTService.instance;
  }

  // Mock NFT'leri getir (gerçek implementasyonda Metaplex kullanılacak)
  async getUserNFTs(walletAddress: string): Promise<NFTData[]> {
    try {
      // Mock NFT listesi
      const mockNFTs: NFTData[] = [
        {
          id: '1',
          name: 'Bordro #1',
          image: 'https://dogukanerdem.av.tr/wp-content/uploads/2022/07/Bordro-Ornegi-1.png',
          description: 'Bordro Örnegi',
          mintAddress: 'NFT' + Math.random().toString(36).substring(2, 15).toUpperCase(),
          createdAt: new Date().toISOString(),
          owner: walletAddress,
          attributes: [
            { trait_type: 'Type', value: 'Art' },
            { trait_type: 'Rarity', value: 'Common' }
          ]
        },
        {
          id: '2',
          name: 'Bordro #2',
          image: 'https://dogukanerdem.av.tr/wp-content/uploads/2022/07/Bordro-Ornegi-1.png',
          description: 'Bordro Örnegi',
          mintAddress: 'NFT' + Math.random().toString(36).substring(2, 15).toUpperCase(),
          createdAt: new Date().toISOString(),
          owner: walletAddress,
          attributes: [
            { trait_type: 'Type', value: 'Digital Art' },
            { trait_type: 'Rarity', value: 'Rare' }
          ]
        }
      ];

      // Cache'e ekle
      mockNFTs.forEach(nft => {
        this.cache.set(nft.id, nft);
      });

      return mockNFTs;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      return [];
    }
  }

  // Cache'den NFT getir
  getCachedNFT(id: string): NFTData | undefined {
    return this.cache.get(id);
  }

  // Cache'i temizle
  clearCache(): void {
    this.cache.clear();
  }

  // NFT detaylarını getir
  async getNFTDetails(mintAddress: string): Promise<NFTData | null> {
    try {
      // Mock NFT detayları
      const nft: NFTData = {
        id: Math.random().toString(),
        name: 'NFT Details',
        image: 'https://via.placeholder.com/300x300/FF9800/FFFFFF?text=NFT+Details',
        description: 'NFT detayları',
        mintAddress: mintAddress,
        createdAt: new Date().toISOString(),
        owner: 'Mock Owner',
        attributes: [
          { trait_type: 'Mint Address', value: mintAddress },
          { trait_type: 'Created', value: new Date().toLocaleDateString() }
        ]
      };

      return nft;
    } catch (error) {
      console.error('Error fetching NFT details:', error);
      return null;
    }
  }

  // Yeni NFT ekle (mint sonrası)
  addNFT(nft: NFTData): void {
    this.cache.set(nft.id, nft);
  }

  // Tüm NFT'leri getir
  getAllNFTs(): NFTData[] {
    return Array.from(this.cache.values());
  }
}

export const nftService = NFTService.getInstance(); 