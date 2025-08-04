# Solana NFT Mint (React Native)

## 🚀 Özellikler
- ✅ **Fotoğraf Seçimi**: Galeriden fotoğraf seçme ve önizleme
- ✅ **Progress Tracking**: Yükleme işlemlerini % ilerleme göstergesiyle takip etme
- ✅ **NFT Mint**: Solana Devnet üzerinde NFT mint etme
- ✅ **IPFS Upload**: Dosyaları IPFS'e yükleme (Infura IPFS)
- ✅ **Modern UI**: React Native Paper ile güzel arayüz
- ✅ **Backend Integration**: Express.js backend ile NFT mint işlemleri
- ✅ **Gallery View**: Mint edilen NFT'leri görüntüleme

## 📱 Ekranlar

### Mint Ekranı
- Galeriden fotoğraf seçme
- Seçilen fotoğrafın önizlemesi
- Yükleme progress göstergesi (%)
- NFT mint işlemi
- Başarılı mint sonrası galeriye yönlendirme

### Galeri Ekranı
- NFT listesi görüntüleme
- Pull-to-refresh özelliği
- FAB ile yeni NFT mint etme
- NFT detayları (mint address, tarih)
  
**Gerçek Cüzdan Entegrasyonu**
Mock yerine gerçek cüzdan kullanmak için(walletConnect.tsx):

1. `connectWallet()` içinde Solana Mobile Wallet Adapter (Phantom, Backpack veya WalletConnect) kodunu çağırın ve kullanıcıdan cüzdan erişimi izni isteyin.
2. Dönen `publicKey` değerini `this.walletInfo.publicKey`’e atayın ve `connected: true` durumunu güncelleyin.
3. `updateBalance()` metodu, paylaşımlı `Connection` nesnesi üzerinden gerçek SOL bakiyesini sorgular.
4. Bu sayede mock implementasyondan gerçek cüzdana geçiş sadece `connectWallet()`’ı güncelleyerek yapılabilir; diğer servis metotları aynı şekilde çalışmaya devam eder.

## 🛠️ Kurulum

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Backend Kurulumu
```bash
cd mint-backend
npm install
```

### 3. Environment Dosyası
`mint-backend/.env` dosyası oluşturun:
```env
SERVICE_WALLET_SECRET=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64]
PORT=3001
```

## 🚀 Çalıştırma

### Hızlı Başlatma
```bash
./start-app.sh
```

### Manuel Başlatma

1. **Backend'i başlatın:**
```bash
cd mint-backend
npm start
```

2. **Frontend'i başlatın (yeni terminal):**
```bash
npm start
```

3. **Mobil uygulamayı açın:**
- Android: `npm run android`
- iOS: `npm run ios`
- Web: `npm run web`

## 📁 Klasör Yapısı

```
solana-nft-mint-main/
├── src/
│   ├── screens/
│   │   ├── MintScreen.tsx      # NFT mint ekranı
│   │   └── GalleryScreen.tsx   # Galeri ekranı
│   ├── components/
│   │   ├── NFTCard.tsx         # NFT kart bileşeni
│   │   └── ProgressBar.tsx     # Progress bar
│   ├── services/
│   │   ├── ipfs.ts            # IPFS upload servisi
│   │   └── wallet.ts          # Cüzdan servisi
│   └── navigation/
│       └── AppNavigator.tsx    # Navigasyon
├── mint-backend/
│   ├── index.js               # Express.js backend
│   ├── package.json           # Backend dependencies
│   └── README.md              # Backend dokümantasyonu
└── start-app.sh               # Otomatik başlatma scripti
```
#### src/service/wallet.ts moc public key eklemeyi unutmayın. - const mockPublicKey = 'buraya key gelecek '; #### 

## 🔧 API Endpoints

### Backend (Port 3001)
- `POST /mint` - NFT mint işlemi
- `GET /health` - Servis durumu
- `GET /balance` - Wallet bakiyesi

## 🎯 Kullanım

1. **Fotoğraf Seçme**: Mint ekranında "Fotoğraf Seç" butonuna tıklayın
2. **Önizleme**: Seçilen fotoğraf görüntülenir
3. **Mint İşlemi**: "NFT Mint Et" butonuna tıklayın
4. **Progress Takibi**: Yükleme işlemi % göstergesiyle takip edilir
5. **Galeri**: Başarılı mint sonrası otomatik olarak galeriye yönlendirilir

## ⚠️ Önemli Notlar

- **Solana Devnet**: Uygulama Solana Devnet'te çalışır
- **SOL Gereksinimi**: NFT mint işlemleri için SOL gereklidir
- **Wallet Secret**: Backend için güvenli bir wallet secret key kullanın
- **IPFS**: Infura IPFS servisi kullanılmaktadır

## 🐛 Sorun Giderme

### Fotoğraf Seçilmiyor
- Galeri izinlerini kontrol edin
- `expo-image-picker` paketinin yüklü olduğundan emin olun

### NFT Mint Çalışmıyor
- Backend'in çalıştığından emin olun (`http://localhost:3001/health`)
- `.env` dosyasının doğru yapılandırıldığını kontrol edin
- Wallet'da yeterli SOL olduğunu kontrol edin

### Progress Bar Çalışmıyor
- `ProgressBar` bileşeninin doğru import edildiğini kontrol edin
- Upload işlemlerinin sırasını kontrol edin

## 📝 Geliştirme

### Yeni Özellik Ekleme
1. İlgili ekranı `src/screens/` altında oluşturun
2. Navigasyonu `src/navigation/AppNavigator.tsx`'e ekleyin
3. Gerekli servisleri `src/services/` altında oluşturun

### Backend Geliştirme
1. Yeni endpoint'leri `mint-backend/index.js`'e ekleyin
2. Environment değişkenlerini `.env` dosyasına ekleyin
3. API dokümantasyonunu güncelleyin

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun


