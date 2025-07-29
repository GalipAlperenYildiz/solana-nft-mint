import React from 'react';
import { Card, Button, Text } from 'react-native-paper';

interface NFTCardProps {
  name: string;
  image: string;
  onPress?: () => void;
}

export default function NFTCard({ name, image, onPress }: NFTCardProps) {
  return (
    <Card style={{ marginVertical: 8 }}>
      {image ? <Card.Cover source={{ uri: image }} /> : null}
      <Card.Title title={name} />
      <Card.Actions>
        <Button onPress={onPress}>Detay</Button>
      </Card.Actions>
    </Card>
  );
} 