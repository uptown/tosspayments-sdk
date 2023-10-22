import { ValidationError } from '../utils/validationError.js';

export type PaymentKey = string & { readonly maxLength?: 200 };
type OrderId = string & { readonly minLength?: 6, readonly maxLength?: 64 }; // Note: this doesn't enforce character constraints

export type PaymentConfirmRequest = {
  paymentKey: PaymentKey;
  orderId: OrderId;
  amount: number;
}

export type PaymentInquiryRequest = {
  paymentKey: PaymentKey;
} & {
  orderId: OrderId;
}

type RefundReceiveAccount = {
  bank: string;
  accountNumber: string;
  holderName: string;
}
type Currency = 'USD';

export interface PaymentCancelRequest {
  cancelReason: string; // Max length is 200.
  cancelAmount?: number; // Optional, full amount if not specified.
  refundReceiveAccount?: RefundReceiveAccount; // Only required for 가상계좌.
  taxFreeAmount?: number; // Default is 0 if not provided.
  currency?: Currency; // Only for PayPal, currently only 'USD' is valid.
}

// Helper function to validate the constraints
export const validateCancelRequestBody = (body: PaymentCancelRequest) => {
  if (body.cancelReason.length > 200) throw new ValidationError('cancelReason is too long');
  if (body.refundReceiveAccount) {
    if (body.refundReceiveAccount.accountNumber.length > 20 ||
      /\D/.test(body.refundReceiveAccount.accountNumber)) throw new ValidationError('accountNumber is invalid');
    if (body.refundReceiveAccount.holderName.length > 60) throw new ValidationError('holderName is too long');
  }
  if (body.currency && body.currency !== 'USD') throw new ValidationError('currency is invalid');
}

export type PaymentKeyInRequestBody = {
  amount: number; // 필수
  orderId: string; // 필수
  cardNumber: string; // 필수
  cardExpirationYear: string; // 필수
  cardExpirationMonth: string; // 필수
  orderName: string; // 필수
  customerIdentityNumber: string; // 필수
  cardPassword?: string; // Optional
  cardInstallmentPlan?: 0 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Optional, 일시불 or 2~12
  useFreeInstallmentPlan?: boolean; // Optional
  taxFreeAmount?: number; // Optional
  customerEmail?: string; // Optional
  customerName?: string; // Optional
  vbv?: {
    cavv: string;
    xid: string;
    eci: string;
  }; // Optional
};

export interface IssueVirtualAccountRequest {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
  bank: string;
  accountKey?: string;
  validHours?: number;
  dueDate?: string;
  customerEmail?: string;
  customerMobilePhone?: string;
  taxFreeAmount?: number;
  useEscrow?: boolean;
  cashReceipt?: {
    type: string;
    registrationNumber?: string;
  };
  escrowProducts?: {
    id: string;
    name: string;
    code: string;
    unitPrice: number;
    quantity: number;
  }[];
}

export function validateIssueVirtualAccountRequest(body: IssueVirtualAccountRequest): void {
  const errors: string[] = [];

  // Validate amount
  if (body.amount <= 0) {
    errors.push("Invalid amount: It should be a positive integer.");
  }

  // Validate orderId
  if (!body.orderId || body.orderId.length < 6 || body.orderId.length > 64 || !/^[a-zA-Z0-9-_]+$/.test(body.orderId)) {
    errors.push("Invalid orderId: It should be a string of 6-64 characters and can include letters, numbers, -, and _.");
  }

  // Validate orderName
  if (!body.orderName || body.orderName.length < 1 || body.orderName.length > 100) {
    errors.push("Invalid orderName: It should be a string of 1-100 characters.");
  }

  // Validate customerName
  if (!body.customerName || body.customerName.length > 100) {
    errors.push("Invalid customerName: It should be a string with up to 100 characters.");
  }

  // Validate bank
  if (!body.bank) {
    errors.push("Invalid bank: Bank name is required.");
  }

  // Validate accountKey
  if (body.accountKey && body.accountKey.length > 13) {
    errors.push("Invalid accountKey: It should be a string with up to 13 characters.");
  }

  // Validate validHours and dueDate
  if (body.validHours && body.dueDate) {
    errors.push("Only one of validHours or dueDate should be provided.");
  } else if (body.validHours && (body.validHours <= 0 || body.validHours > 720)) {
    errors.push("Invalid validHours: It should be between 1 and 720.");
  } else if (body.dueDate && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(body.dueDate)) {
    errors.push("Invalid dueDate: It should be in yyyy-MM-dd'T'HH:mm:ss format.");
  }

  // Validate customerEmail
  if (body.customerEmail && body.customerEmail.length > 100) {
    errors.push("Invalid customerEmail: It should be a string with up to 100 characters.");
  }

  // [Continue with the remaining validations...]

  if (errors.length > 0) {
    throw new ValidationError(errors.join(' '));
  }
}

export type IssueBillingKeyWithCustomerKeyRequest = {
  customerKey: string;  // Ensure the constraints are checked at runtime.
  cardNumber: string;   // Ensure the max length is 20 characters.
  cardExpirationYear: string;
  cardExpirationMonth: string;
  customerIdentityNumber: string;  // Depending on your use-case, you might want separate fields for birthdate and registration number.
  cardPassword?: string;  // Optional: first two digits of the card password.
  customerName?: string;  // Optional: ensure the max length is 100 characters.
  customerEmail?: string;  // Optional: ensure the max length is 100 characters.
  vbv?: {
    cavv: string;
    xid: string;
    eci: string;
  };
}

export function validateIssueBillingKeyWithCustomerKey(data: IssueBillingKeyWithCustomerKeyRequest) {
  const customerKeyPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_=.@]).{2,300}$/;
  const yearPattern = /^\d{4}$/;
  const monthPattern = /^(0[1-9]|1[0-2])$/;

  if (!customerKeyPattern.test(data.customerKey)) {
    throw new ValidationError("Invalid customerKey.");
  }

  if (data.cardNumber.length > 20) {
    throw new ValidationError("Invalid cardNumber length.");
  }

  if (!yearPattern.test(data.cardExpirationYear)) {
    throw new ValidationError("Invalid cardExpirationYear.");
  }

  if (!monthPattern.test(data.cardExpirationMonth)) {
    throw new ValidationError("Invalid cardExpirationMonth.");
  }

  const idLength = data.customerIdentityNumber.length;
  if (idLength !== 6 && idLength !== 10) {
    throw new ValidationError("Invalid customerIdentityNumber length.");
  }

  if (data.cardPassword && data.cardPassword.length !== 2) {
    throw new ValidationError("Invalid cardPassword length.");
  }

  if (data.customerName && data.customerName.length > 100) {
    throw new ValidationError("Invalid customerName length.");
  }

  if (data.customerEmail && data.customerEmail.length > 100) {
    throw new ValidationError("Invalid customerEmail length.");
  }

  if (data.vbv) {
    if (!data.vbv.cavv || !data.vbv.xid || !data.vbv.eci) {
      throw new ValidationError("Invalid vbv data.");
    }
  }
}

export type IssueBillingKeyWithAuthKeyRequest = {
  authKey: string; // A one-time authentication key with a maximum length of 300 characters.
  customerKey: string; // A unique customer ID with constraints mentioned above.
};

export type BillingConfirmRequest = {
  amount: number; // Amount to be paid.
  customerKey: string; // Unique customer ID with specified constraints.
  orderId: string; // Unique order ID with specified constraints.
  orderName: string; // Order name with a maximum length of 100 characters.
  customerEmail?: string; // Optional customer email address with a maximum length of 100 characters.
  customerName?: string; // Optional customer name with a maximum length of 100 characters.
  taxFreeAmount?: number; // Tax-free amount, defaulting to 0 if not provided.
  cardInstallmentPlan?: number; // Installment plan for credit card payments, ranges between 2 to 12. If 0 or not provided, it'll be a lump-sum payment.
};

export type TransactionInquiryRequest = {
  startDate: string;  // Required
  endDate: string;    // Required
  startingAfter?: string; // Optional
  limit?: number;     // Optional, default is 100, and the maximum value is 10,000
};

export type SettlementInquiryRequest = {
  startDate: string; // Format: yyyy-MM-dd, e.g., 2022-01-01. Required field.
  endDate: string; // Format: yyyy-MM-dd, e.g., 2022-01-01. Required field.
  dateType?: "soldDate" | "paidOutDate"; // Default is "soldDate" if not provided.
  page?: number; // Default value might be determined by the backend. Minimum value is 1.
  size?: number; // Default is 100. Maximum value is 10000.
};

export type SettlementManuallyRequest = {
  paymentKey: PaymentKey; // Required
}

export type IssueCashReceiptRequest = {
  amount: number;
  orderId: string;     // Min length: 6, Max length: 64. Can contain English alphabets, numbers, -, and _
  orderName: string;   // Max length: 100
  customerIdentityNumber: string; // Max length: 30, can be mobile number, SSN, business number, etc.
  type: '소득공제' | '지출증빙';  // Translation: Income Deduction or Expenditure Evidence
  taxFreeAmount?: number;  // Defaults to 0 if not provided. Applicable only for certain types of shops.
}

export type CashReceiptInquiryRequest = {
  requestDate: string;   // Format: yyyy-MM-dd (e.g. 2022-01-01)
  cursor?: number;       // Optional: To get records after a specific cash receipt issuance.
  limit?: number;        // Optional: Default is 100, Max is 10,000.
}
