export interface CustomerOrder {
  acceptedOn: string;
  billingAddress: BillingAddress;
  comment: string;
  customerInfo: CustomerInfo;
  customerPaid: TotalsObj;
  netAmount: TotalsObj;
  orderComment: string;
  orderId: string;
  paypalDetails: PaypalDetails;
  purchasedItems: PurchasedItems[];
  status: string;
  stripeDetails: StripeDetails;
  totals: Totals;
  [key: string]: any; // for index searching
}

interface BillingAddress {
  type: string;
  addressee: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface CustomerInfo {
  fullName: string;
  email: string;
}

interface TotalsObj {
  unit: string;
  value: number;
  string: string;
}

interface PaypalDetails {
  orderId: string | null;
  payerId: string | null;
  captureId: string | null;
  refundId: string | null;
  refundReason: string | null;
  disputeId: string | null;
}

export interface PurchasedItems {
  count: number;
  rowTotal: TotalsObj;
  productId: string;
  productName: string;
  productSlug: string;
  variantId: string;
  variantName: string;
  variantSlug: string;
  variantSKU: string | null;
  variantImage: {
    fileId: string;
    url: string;
    alt: string | null;
  };
  variantPrice: TotalsObj;
  weight: number;
  height: number;
  width: number;
  length: number;
}

interface StripeDetails {
  customerId: string | null;
  chargeId: string | null;
  disputeId: string | null;
  paymentIntentId: string | null;
  paymentMethod: string | null;
  subscriptionId: string | null;
  refundId: string | null;
  refundReason: string | null;
}

interface Totals {
  subtotal: TotalsObj;
  extras: TotalsExtra[];
  total: TotalsObj;
}

interface TotalsExtra {
  type: string;
  name: string;
  description: string;
  price: TotalsObj;
}
