import Purchases, { CustomerInfo, LOG_LEVEL, LogInResult, PurchasesConfiguration, PurchasesOffering } from 'react-native-purchases';

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
    const loginResult: LogInResult = await Purchases.logIn(userId);
    return loginResult.customerInfo;
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
    // TODO: Move the harcoded string elsewhere
    return customerInfo.entitlements.active['premium_access'] !== undefined;
  }
}

export default PurchasesService.getInstance();