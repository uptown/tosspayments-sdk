type FeeDetail = {
  type: "BASE" | "INSTALLMENT_DISCOUNT" | "INSTALLMENT" | "POINT_SAVING" | "ETC";
  fee: number;
  supplyAmount: number;
  vat: number;
};

export type Settlement = {
  mId: string;
  paymentKey: string;
  transactionKey: string;
  orderId: string;
  currency: string;
  method: "카드" | "가상계좌" | "간편결제" | "휴대폰" | "계좌이체" | "문화상품권" | "도서문화상품권" | "게임문화상품권";
  amount: number;
  interestFee: number;
  fees: FeeDetail[];
  payOutAmount: number;
  approvedAt: string;
  soldDate: string;
  paidOutDate: string;
};
