import Purchases, { CustomerInfo, LOG_LEVEL, PurchasesConfiguration, PurchasesOffering } from 'react-native-purchases';

const REVENUECAT_API_KEY = 'your_revenuecat_api_key';



class PurchasesService {
  private static _instance: PurchasesService | null = null;

  private constructor() {
    // Private constructor to prevent direct construction calls with the `new` operator.
  }

  public static getInstance(): PurchasesService {
    if (!PurchasesService._instance) {
      PurchasesService._instance = new PurchasesService();
    }
    return PurchasesService._instance;
  }

  public async initialize(): Promise<void> {
    await Purchases.configure({ apiKey: REVENUECAT_API_KEY });
  }

  public async login(userId: string): Promise<CustomerInfo> {
    return await Purchases.logIn(userId);
  }

  public async logout(): Promise<void> {
    await Purchases.logOut();
  }

  public async getOfferings(): Promise<PurchasesOffering | null> {
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  }

  public async purchasePackage(packageToPurchase: any): Promise<CustomerInfo> {
    const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
    return customerInfo;
  }

  public async restorePurchases(): Promise<CustomerInfo> {
    return await Purchases.restorePurchases();
  }

  public async getCustomerInfo(): Promise<CustomerInfo> {
    return await Purchases.getCustomerInfo();
  }

  public async checkSubscriptionStatus(): Promise<boolean> {
    const customerInfo = await this.getCustomerInfo();
    // Replace 'your_entitlement_id' with the actual entitlement ID you're using
    return customerInfo.entitlements.active['your_entitlement_id'] !== undefined;
  }
}

export default PurchasesService.getInstance();