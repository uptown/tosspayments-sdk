export type CashReceipt = {
  receiptKey: string;  // Max length: 200
  issueNumber: string; // Max length: 9
  issueStatus: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  amount: number;
  taxFreeAmount: number;
  orderId: string;     // Min length: 6, Max length: 64
  orderName: string;   // Max length: 100
  type: '소득공제' | '지출증빙';  // Translation: Income Deduction or Expenditure Evidence
  transactionType: 'CONFIRM' | 'CANCEL';
  businessNumber: string;  // Length: 10
  customerIdentityNumber: string; // Max length: 30, can be mobile number, SSN, business number, etc.
  failure?: {
    code: string;
    message: string;   // Max length: 510
  };
  requestedAt: string;  // ISO 8601 format: yyyy-MM-dd'T'HH:mm:ss±hh:mm
  receiptUrl: string;
}
