import axios from 'axios';
import { Buffer } from 'buffer';

const INFURA_PROJECT_ID = 'ff9943ef1b2d42038e14c22689735668';
const INFURA_PROJECT_SECRET = 'kiyVjEcV4sk51pMylLa9QbkpYcL3W26iBd9vrcqMJjmeJqM5v2zDXg';

const auth =
  'Basic ' + Buffer.from(INFURA_PROJECT_ID + ':' + INFURA_PROJECT_SECRET).toString('base64');

export async function uploadFileToIPFS(fileUri: string, fileName: string): Promise<string> {
  // Dosyayı base64 olarak oku
  const response = await fetch(fileUri);
  const blob = await response.blob();

  const formData = new FormData();
  formData.append('file', blob, fileName);

  const res = await axios.post('https://ipfs.infura.io:5001/api/v0/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: auth,
    },
  });

  const hash = res.data.Hash;
  return `https://ipfs.io/ipfs/${hash}`;
}

export async function uploadMetadataToIPFS(metadata: object): Promise<string> {
  const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
  const formData = new FormData();
  formData.append('file', blob, 'metadata.json');

  const res = await axios.post('https://ipfs.infura.io:5001/api/v0/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: auth,
    },
  });

  const hash = res.data.Hash;
  return `https://ipfs.io/ipfs/${hash}`;
} 