import axios from 'axios';
import { Buffer } from 'buffer';

// Mock IPFS servisi - gerçek IPFS yerine test için
export async function uploadFileToIPFS(fileUri: string, fileName: string): Promise<string> {
  try {
    console.log('Mock IPFS upload başladı:', fileName);
    
    // Simüle edilmiş upload süresi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock IPFS hash oluştur
    const mockHash = 'Qm' + Math.random().toString(36).substring(2, 15);
    const mockUrl = `https://ipfs.io/ipfs/${mockHash}`;
    
    console.log('Mock IPFS upload tamamlandı:', mockUrl);
    return mockUrl;
  } catch (error: any) {
    console.error('Mock IPFS upload error:', error);
    throw new Error(`IPFS upload failed: ${error.message || 'Unknown error'}`);
  }
}

export async function uploadMetadataToIPFS(metadata: object): Promise<string> {
  try {
    console.log('Mock metadata upload başladı');
    
    // Simüle edilmiş upload süresi
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock metadata hash oluştur
    const mockHash = 'Qm' + Math.random().toString(36).substring(2, 15);
    const mockUrl = `https://ipfs.io/ipfs/${mockHash}`;
    
    console.log('Mock metadata upload tamamlandı:', mockUrl);
    return mockUrl;
  } catch (error: any) {
    console.error('Mock metadata upload error:', error);
    throw new Error(`IPFS metadata upload failed: ${error.message || 'Unknown error'}`);
  }
} 