#!/bin/bash

echo "🚀 Solana NFT Mint Uygulamasını Başlatıyor..."

# Backend'i başlat
echo "📡 Backend servisini başlatıyor..."
cd mint-backend
if [ ! -f .env ]; then
    echo "⚠️  .env dosyası bulunamadı!"
    echo "📝 Lütfen mint-backend/.env dosyası oluşturun:"
    echo "SERVICE_WALLET_SECRET=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64]"
    echo "PORT=3001"
    exit 1
fi

# Backend'i arka planda başlat
npm start &
BACKEND_PID=$!

echo "✅ Backend başlatıldı (PID: $BACKEND_PID)"

# Ana dizine dön
cd ..

# Frontend'i başlat
echo "📱 Frontend uygulamasını başlatıyor..."
npm start

# Temizlik
echo "🧹 Servisleri kapatıyor..."
kill $BACKEND_PID 2>/dev/null 