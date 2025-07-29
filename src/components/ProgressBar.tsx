import React from 'react';
import { ProgressBar as PaperProgressBar } from 'react-native-paper';

interface ProgressBarProps {
  progress: number; // 0-1 arası
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return <PaperProgressBar progress={progress} style={{ marginVertical: 16 }} />;
} 