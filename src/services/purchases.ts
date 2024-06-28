import Purchases, { LOG_LEVEL } from 'react-native-purchases';

const API_KEY = 'your_revenuecat_api_key';

export function initializePurchases(): void {
    Purchases.setLogLevel(LOG_LEVEL.DEBUG); // TODO Remove this line for production
    Purchases.configure({ apiKey: API_KEY });
}