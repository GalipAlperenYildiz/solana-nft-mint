import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Text, Snackbar, Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { uploadFileToIPFS, uploadMetadataToIPFS } from '../services/ipfs';
import ProgressBar from '../components/ProgressBar';
import WalletConnect from '../components/WalletConnect';
import { WalletInfo } from '../services/wallet';

export default function MintScreen({ navigation }: any) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);

  const handlePickImage = async () => {
    try {
      // İzinleri kontrol et
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        setSnackbar('Galeri erişim izni gerekli!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setSelectedImage(result.assets[0]);
        setSnackbar('Fotoğraf seçildi: ' + result.assets[0].fileName);
      }
    } catch (e) {
      setSnackbar('Fotoğraf seçilemedi!');
    }
  };

  const handleMint = async () => {
    if (!selectedImage) {
      setSnackbar('Önce fotoğraf seçin!');
      return;
    }

    setMinting(true);
    setUploadProgress(0);

    try {
      // Dosyayı IPFS'e yükle
      setUploadProgress(0.2);
      const ipfsFileUrl = await uploadFileToIPFS(selectedImage.uri, selectedImage.fileName || 'nft-image.jpg');
      setIpfsUrl(ipfsFileUrl);
      setUploadProgress(0.6);

      // Metadata oluştur ve IPFS'e yükle
      const metadata = {
        name: selectedImage.fileName || 'NFT Image',
        image: ipfsFileUrl,
        description: 'Solana NFT Mint',
        attributes: [
          { trait_type: 'Type', value: 'NFT' },
          { trait_type: 'Created', value: new Date().toISOString() }
        ]
      };
      
      setUploadProgress(0.8);
      const metadataUrl = await uploadMetadataToIPFS(metadata);
      setUploadProgress(0.9);

      // Mint işlemini backend'e gönder
      const response = await fetch('http://localhost:3001/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          metadataUri: metadataUrl, 
          name: selectedImage.fileName || 'NFT Image',
          imageUrl: ipfsFileUrl
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.error) throw new Error(result.error);
      
      setUploadProgress(1);
      
      // Detaylı başarı mesajı
      const isMock = result.isMock || false;
      const mockText = isMock ? '\n🧪 (BETA - Mock İşlem)' : '';
      
      const successMessage = `🎉 NFT Başarıyla Mint Edildi!${mockText}
      
📋 NFT Adresi: ${result.mintAddress}
🔗 İşlem Hash: ${result.txId}
📁 Dosya: ${selectedImage.fileName}
🌐 IPFS URL: ${ipfsFileUrl}

${isMock ? 'NFT\'niz test ortamında oluşturuldu!' : 'NFT\'niz Solana Devnet\'te yayınlandı!'}`;
      
      setSnackbar(successMessage);
      
      // Başarılı mint sonrası galeriye yönlendir
      setTimeout(() => {
        navigation.navigate('Gallery');
      }, 5000);

    } catch (e: any) {
      let errorMessage = 'Mint hatası: ';
      
      if (e.message?.includes('timeout')) {
        errorMessage += 'IPFS yükleme zaman aşımı. Lütfen tekrar deneyin.';
      } else if (e.message?.includes('SOL')) {
        errorMessage += 'Yetersiz SOL bakiyesi. Devnet\'ten SOL alın.';
      } else if (e.message?.includes('network')) {
        errorMessage += 'Ağ bağlantı sorunu. İnternet bağlantınızı kontrol edin.';
      } else {
        errorMessage += e.message || e;
      }
      
      setSnackbar(errorMessage);
    } finally {
      setMinting(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const handleWalletConnect = (wallet: WalletInfo) => {
    setWalletInfo(wallet);
    setSnackbar('Cüzdan başarıyla bağlandı!');
  };

  return (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.contentContainer}
  >
      <Text style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}>NFT Mint Ekranı</Text>
      
      <WalletConnect onWalletConnect={handleWalletConnect} />
      
      {selectedImage && (
        <Card style={styles.imageCard}>
          <Card.Cover source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
          <Card.Content>
            <Text style={{ fontSize: 14, color: '#666' }}>Seçilen: {selectedImage.fileName || 'Fotoğraf'}</Text>
          </Card.Content>
        </Card>
      )}

      <Button 
        mode="contained" 
        style={styles.button} 
        onPress={handlePickImage}
        icon="image"
      >
        Fotoğraf Seç
      </Button>

      {minting && (
        <View style={styles.progressContainer}>
          <Text style={{ fontSize: 14, color: '#333', marginBottom: 8 }}>Yükleniyor... %{Math.round(uploadProgress * 100)}</Text>
          <ProgressBar progress={uploadProgress} />
        </View>
      )}

      <Button 
        mode="contained" 
        style={styles.button} 
        onPress={handleMint} 
        loading={minting} 
        disabled={!selectedImage || minting}
        icon="plus"
      >
        NFT Mint Et
      </Button>

      <Button 
        mode="outlined" 
        style={styles.button} 
        onPress={() => navigation.navigate('Gallery')}
        icon="image-multiple"
      >
        Galeriye Git
      </Button>

      <Snackbar 
        visible={!!snackbar} 
        onDismiss={() => setSnackbar(null)}
        duration={8000}
        style={{ maxHeight: 200 }}
      >
        {snackbar}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    backgroundColor: '#fff',
    // NOT: justifyContent/alignItems buradan kaldırıldı
  },
  contentContainer: {
    flexGrow: 1,             // İçerik ekranı doldursun
    justifyContent: 'center',// Dikey ortala
    alignItems: 'center',    // Yatay ortala
  },
  title: {
    marginBottom: 20,
    textAlign: 'center'
  },
  button: { 
    marginVertical: 8, 
    width: 250,
    marginHorizontal: 16
  },
  imageCard: {
    marginVertical: 16,
    width: 300,
    maxHeight: 300
  },
  selectedImage: {
    height: 200,
    resizeMode: 'cover'
  },
  progressContainer: {
    width: '100%',
    marginVertical: 16,
    alignItems: 'center'
  }
}); 