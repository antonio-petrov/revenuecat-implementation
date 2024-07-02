import React, {useEffect, useState} from 'react';
import {View, Button, Text} from 'react-native';
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

  return (
    <View>
      <Text>Premium Status: {isPremium ? 'Active' : 'Inactive'}</Text>
      {offerings?.availablePackages.map(pkg => (
        <Button
          key={pkg.identifier}
          title={`Buy ${pkg.product.priceString}`}
          onPress={() => handlePurchase(pkg)}
        />
      ))}
    </View>
  );
};

export default SubscriptionScreen;
