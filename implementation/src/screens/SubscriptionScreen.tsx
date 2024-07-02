import React, {useEffect, useState} from 'react';
import {View, Button, Text, ScrollView, StyleSheet} from 'react-native';
import PurchasesService from '../services/PurchasesService';
import {PurchasesOffering, PurchasesPackage} from 'react-native-purchases';

const SubscriptionScreen = () => {
  const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    fetchOfferings();
    checkPremiumStatus();
  }, []);

  const fetchOfferings = async () => {
    try {
      const offeringsData = await PurchasesService.getOfferings();
      setOfferings(offeringsData);
    } catch (e) {
      console.log(e);
    }
  };

  const checkPremiumStatus = async () => {
    const status = await PurchasesService.checkSubscriptionStatus();
    setIsPremium(status);
  };

  const handlePurchase = async (pkg: PurchasesPackage) => {
    try {
      await PurchasesService.purchasePackage(pkg);
      await checkPremiumStatus();
    } catch (e) {
      console.error('Purchase failed:', e);
    }
  };

  const renderSubscriptionStatus = () => {
    return (
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Premium Status: {isPremium ? 'Active' : 'Inactive'}
        </Text>
      </View>
    );
  };

  const renderOfferings = () => {
    if (!offerings) return <Text>No offerings available</Text>;

    return offerings.availablePackages.map(pkg => (
      <View key={pkg.identifier} style={styles.packageContainer}>
        <Text style={styles.packageTitle}>{pkg.product.title}</Text>
        <Text>{pkg.product.description}</Text>
        <Text style={styles.price}>{pkg.product.priceString}</Text>
        <Button title="Purchase" onPress={() => handlePurchase(pkg)} />
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Subscriptions</Text>
      {renderSubscriptionStatus()}
      <Text style={styles.subtitle}>Available Subscriptions:</Text>
      {renderOfferings()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  statusContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  statusText: {
    fontSize: 16,
  },
  packageContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

export default SubscriptionScreen;
