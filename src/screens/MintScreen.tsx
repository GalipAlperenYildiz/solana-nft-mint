import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Snackbar } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { uploadFileToIPFS, uploadMetadataToIPFS } from '../services/ipfs';

export default function MintScreen({ navigation }: any) {
  const [file, setFile] = useState<any>(null);
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);
  const [snackbar, setSnackbar] = useState<string | null>(null);

  const handlePickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({});
      if (res.type === 'success') {
        setFile(res);
        setSnackbar('Dosya seçildi: ' + res.name);
      }
    } catch (e) {
      setSnackbar('Dosya seçilemedi!');
    }
  };

  const handleMint = async () => {
    if (!file) return setSnackbar('Önce dosya seçin!');
    setMinting(true);
    try {
      // Dosyayı IPFS'e yükle
      const fileUri = file.uri;
      const fileName = file.name;
      const ipfsFileUrl = await uploadFileToIPFS(fileUri, fileName);
      setIpfsUrl(ipfsFileUrl);
      // Metadata oluştur ve IPFS'e yükle
      const metadata = {
        name: fileName,
        image: ipfsFileUrl,
        description: 'Solana NFT Mint',
      };
      const metadataUrl = await uploadMetadataToIPFS(metadata);
      // Mint işlemini backend'e gönder
      const response = await fetch('http://<BACKEND_IP>:3001/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metadataUri: metadataUrl, name: fileName }),
      });
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      setSnackbar('Mint başarılı! NFT: ' + result.mintAddress);
    } catch (e: any) {
      setSnackbar('Mint hatası: ' + (e.message || e));
    } finally {
      setMinting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">NFT Mint Ekranı</Text>
      <Button mode="contained" style={styles.button} onPress={handlePickFile}>
        Dosya Seç
      </Button>
      <Button mode="contained" style={styles.button} onPress={handleMint} loading={minting} disabled={!file}>
        Mint Et
      </Button>
      <Button mode="outlined" style={styles.button} onPress={() => navigation.navigate('Gallery')}>
        Galeriye Git
      </Button>
      <Snackbar visible={!!snackbar} onDismiss={() => setSnackbar(null)}>{snackbar}</Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  button: { marginVertical: 8, width: 200 },
}); 