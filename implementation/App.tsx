/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import PurchasesService from './src/services/PurchasesService';
import SubscriptionScreen from './src/screens/SubscriptionScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const [showSubscriptions, setShowSubscriptions] = useState(false);

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

  if (showSubscriptions) {
    return <SubscriptionScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your RevenueCat-enabled app!</Text>
      <Button
        title="View Subscriptions"
        onPress={() => setShowSubscriptions(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;
