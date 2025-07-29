import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';

// Dummy NFT listesi (backend'den çekmek istersen burada güncelleyebilirsin)
const dummyNFTs = [
  { id: '1', name: 'NFT 1', image: '' },
  { id: '2', name: 'NFT 2', image: '' },
];

export default function GalleryScreen({ navigation }: any) {
  const [nfts] = useState(dummyNFTs);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">NFT Galerisi</Text>
      <FlatList
        data={nfts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.name} />
            {item.image ? <Card.Cover source={{ uri: item.image }} /> : null}
          </Card>
        )}
      />
      <Button mode="outlined" style={styles.button} onPress={() => navigation.navigate('Mint')}>
        Mint Ekranına Dön
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginVertical: 8 },
  button: { marginTop: 16 },
}); 