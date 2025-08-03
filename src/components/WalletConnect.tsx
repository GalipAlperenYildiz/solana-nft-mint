import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Chip } from 'react-native-paper';
import { walletService, WalletInfo } from '../services/wallet';

interface WalletConnectProps {
  onWalletConnect?: (walletInfo: WalletInfo) => void;
}

export default function WalletConnect({ onWalletConnect }: WalletConnectProps) {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde cüzdan durumunu kontrol et
    const currentWallet = walletService.getWalletInfo();
    if (currentWallet.connected) {
      setWalletInfo(currentWallet);
    }
  }, []);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const wallet = await walletService.connectWallet();
      setWalletInfo(wallet);
      onWalletConnect?.(wallet);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    walletService.disconnect();
    setWalletInfo(null);
  };

  const handleUpdateBalance = async () => {
    if (walletInfo) {
      const newBalance = await walletService.updateBalance();
      setWalletInfo({ ...walletInfo, balance: newBalance });
    }
  };

  if (walletInfo?.connected) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.walletHeader}>
            <Text style={styles.walletTitle}>Cüzdan Bağlı</Text>
            <Chip icon="check" mode="outlined" style={styles.connectedChip}>
              Bağlı
            </Chip>
          </View>
          
          <View style={styles.walletInfo}>
            <Text style={styles.label}>Adres:</Text>
            <Text style={styles.address} numberOfLines={1} ellipsizeMode="middle">
              {walletInfo.publicKey}
            </Text>
            
            <Text style={styles.label}>Bakiye:</Text>
            <Text style={styles.balance}>
              {walletInfo.balance.toFixed(4)} SOL
            </Text>
          </View>
          
          <View style={styles.actions}>
            <Button 
              mode="outlined" 
              onPress={handleUpdateBalance}
              icon="refresh"
              style={styles.actionButton}
            >
              Bakiye Güncelle
            </Button>
            <Button 
              mode="outlined" 
              onPress={handleDisconnect}
              icon="logout"
              style={styles.actionButton}
            >
              Bağlantıyı Kes
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.walletHeader}>
          <Text style={styles.walletTitle}>Cüzdan Bağlantısı</Text>
          <Chip icon="close" mode="outlined" style={styles.disconnectedChip}>
            Bağlı Değil
          </Chip>
        </View>
        
        <Text style={styles.description}>
          NFT mint işlemleri için cüzdanınızı bağlayın
        </Text>
        
        <Button 
          mode="contained" 
          onPress={handleConnect}
          loading={loading}
          icon="wallet"
          style={styles.connectButton}
        >
          Cüzdan Bağla
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 16,
    elevation: 2,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  connectedChip: {
    backgroundColor: '#4CAF50',
  },
  disconnectedChip: {
    backgroundColor: '#FF5722',
  },
  description: {
    marginBottom: 16,
    color: '#666',
    textAlign: 'center',
  },
  connectButton: {
    marginTop: 8,
  },
  walletInfo: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  address: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#666',
    marginTop: 4,
  },
  balance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
}); 