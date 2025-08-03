import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Button, Text, Card, FAB, Chip } from 'react-native-paper';
import { nftService, NFTData } from '../services/nft';
import { walletService } from '../services/wallet';

// Dummy NFT listesi (backend'den çekmek istersen burada güncelle)
const dummyNFTs: NFTData[] = [
  { 
    id: '1', 
    name: 'Bordro Örneği', 
    image: 'https://via.placeholder.com/300x300/4CAF50/FFFFFF?text=NFT+1',
    description: 'İlk NFT örneği',
    mintAddress: 'ABC123...',
    createdAt: '2024-01-15',
    owner: 'Mock Wallet'
  },
  { 
    id: '2', 
    name: 'Bordro Örneği', 
    image: 'https://via.placeholder.com/300x300/2196F3/FFFFFF?text=NFT+2',
    description: 'İkinci NFT örneği',
    mintAddress: 'DEF456...',
    createdAt: '2024-01-16',
    owner: 'Mock Wallet'
  },
];

export default function GalleryScreen({ navigation }: any) {
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadNFTs = async () => {
    try {
      setLoading(true);
      const walletInfo = walletService.getWalletInfo();
      
      if (walletInfo.connected) {
        const userNFTs = await nftService.getUserNFTs(walletInfo.publicKey);
        setNfts(userNFTs);
      } else {
        // Cüzdan bağlı değilse mock NFT'leri göster
        setNfts(dummyNFTs);
      }
    } catch (error) {
      console.error('Error loading NFTs:', error);
      setNfts(dummyNFTs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNFTs();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadNFTs().finally(() => {
      setRefreshing(false);
    });
  }, []);

  const renderNFT = ({ item }: { item: NFTData }) => (
    <Card style={styles.card} mode="outlined">
      <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { fontSize: 16, fontWeight: 'bold' }]}>{item.name}</Text>
          <Chip icon="nft" mode="outlined" style={styles.nftChip}>
            NFT
          </Chip>
        </View>
        <Text style={[styles.cardDescription, { fontSize: 14, color: '#666' }]}>{item.description}</Text>
        <Text style={[styles.cardAddress, { fontSize: 12, fontFamily: 'monospace', color: '#888' }]}>
          Mint: {item.mintAddress}
        </Text>
        <Text style={[styles.cardOwner, { fontSize: 12, color: '#666' }]}>
          Owner: {item.owner}
        </Text>
        <Text style={[styles.cardDate, { fontSize: 12, color: '#999' }]}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        {item.attributes && item.attributes.length > 0 && (
          <View style={styles.attributes}>
            {item.attributes.map((attr, index) => (
              <Chip key={index} mode="outlined" style={styles.attributeChip}>
                {attr.trait_type}: {attr.value}
              </Chip>
            ))}
          </View>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: 20, fontWeight: 'bold' }]}>NFT Galerisi</Text>
      <Text style={[styles.subtitle, { fontSize: 14, color: '#666' }]}>
        {nfts.length} NFT bulundu
      </Text>
      
      <FlatList
        data={nfts}
        keyExtractor={item => item.id}
        renderItem={renderNFT}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Mint')}
        label="Yeni NFT Mint Et"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold'
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#666'
  },
  listContainer: {
    paddingBottom: 80 
  },
  card: { 
    marginVertical: 8,
    elevation: 2,
    backgroundColor: 'white'
  },
  cardImage: {
    height: 200,
    resizeMode: 'cover'
  },
  cardTitle: {
    marginTop: 8,
    fontWeight: 'bold'
  },
  cardDescription: {
    marginTop: 4,
    color: '#666'
  },
  cardAddress: {
    marginTop: 8,
    fontFamily: 'monospace',
    color: '#888'
  },
  cardDate: {
    marginTop: 4,
    color: '#999',
    fontSize: 12
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nftChip: {
    backgroundColor: '#E3F2FD',
  },
  cardOwner: {
    marginTop: 4,
    color: '#666',
    fontSize: 12,
  },
  attributes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  attributeChip: {
    marginRight: 4,
    marginBottom: 4,
    fontSize: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
}); 