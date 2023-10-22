type PaymentStatus =
  | 'READY'
  | 'IN_PROGRESS'
  | 'WAITING_FOR_DEPOSIT'
  | 'DONE'
  | 'CANCELED'
  | 'PARTIAL_CANCELED'
  | 'ABORTED'
  | 'EXPIRED';

type PaymentMethod =
  | '카드'
  | '가상계좌'
  | '간편결제'
  | '휴대폰'
  | '계좌이체'
  | '문화상품권'
  | '도서문화상품권'
  | '게임문화상품권';

export type Transaction = {
  mId: string;
  transactionKey: string;
  paymentKey: string;
  orderId: string;
  method: PaymentMethod;
  customerKey: string;
  useEscrow: boolean;
  receiptUrl: string;
  status: PaymentStatus;
  transactionAt: string;
  currency: string;
  amount: number;
};
