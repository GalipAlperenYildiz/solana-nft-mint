# Solana NFT Mint (React Native)

## Özellikler
- Solana Devnet üzerinde NFT mint etme
- Dosya seçip IPFS'e yükleme (nft.storage)
- Phantom/Backpack cüzdan bağlantısı (Mobile Wallet Adapter)
- Mint edilen NFT'leri listeleme
- Modern ve basit arayüz (React Native Paper)

## Kurulum

1. Bağımlılıkları yükleyin:
   ```sh
   yarn install
   ```
2. Gerekli native modüller için (expo kullanıyorsanız çoğu otomatik gelir):
   ```sh
   npx expo install
   ```
3. `src/services/ipfs.ts` dosyasındaki `NFT_STORAGE_TOKEN` alanına kendi [nft.storage](https://nft.storage/) API anahtarınızı ekleyin.

## Çalıştırma

- Android:
  ```sh
  yarn android
  ```
- iOS:
  ```sh
  yarn ios
  ```
- Web:
  ```sh
  yarn web
  ```

## Klasör Yapısı

- `src/screens/` — Mint ve Galeri ekranları
- `src/components/` — Ortak bileşenler (NFT kartı, progress bar)
- `src/services/` — Solana, IPFS ve cüzdan servisleri
- `src/navigation/` — Navigasyon

## Notlar
- Mint, IPFS ve cüzdan bağlantısı için ilgili fonksiyonlar iskelet olarak bırakılmıştır. Kendi anahtarlarınızı ve cüzdan bağlantı mantığınızı eklemelisiniz.
- Proje Expo + React Native Paper ile uyumludur. 