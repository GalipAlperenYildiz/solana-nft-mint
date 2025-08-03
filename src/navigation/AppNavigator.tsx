import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MintScreen from '../screens/MintScreen';
import GalleryScreen from '../screens/GalleryScreen';

export type RootStackParamList = {
  Mint: undefined;
  Gallery: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Mint"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Mint" 
          component={MintScreen} 
          options={{
            title: 'NFT Mint',
            headerTitle: 'NFT Mint Et'
          }}
        />
        <Stack.Screen 
          name="Gallery" 
          component={GalleryScreen} 
          options={{
            title: 'NFT Galerisi',
            headerTitle: 'NFT Galerisi'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}