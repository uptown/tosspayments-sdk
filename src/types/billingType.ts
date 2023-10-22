export type Billing = {
  mId: string;
  customerKey: string;
  authenticatedAt: string;  // Depending on the usage, consider using a library like `date-fns` or `moment` to work with dates.
  method: '카드';  // Fixed to '카드' since it's mentioned it's the only supported method.
  billingKey: string;
  card: {
    issuerCode: string;
    acquirerCode: string;
    number: string;
    cardType: '신용' | '체크' | '기프트';
    ownerType: '개인' | '법인';
  };
}
