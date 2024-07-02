/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import PurchasesService from '../src/services/PurchasesService';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  useEffect(() => {
    const initializePurchases = async () => {
      try {
        await PurchasesService.initialize();
        console.log('RevenueCat initialized successfully');
      } catch (error) {
        console.error('Failed to initialize RevenueCat:', error);
      }
    };

    initializePurchases();
  }, []);

  return (
    <View style={styles.backgroundStyle}>
      <Text>Welcome to your RevenueCat-enabled app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
