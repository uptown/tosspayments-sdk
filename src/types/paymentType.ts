/** 카드 종류입니다. 신용, 체크, 기프트, 미확인 중 하나입니다.
 * 고객이 해외 카드로 결제했거나 간편결제의 결제 수단을 조합해서 결제했을 때 미확인으로 표시됩니다.
 */
type CardType = '신용' | '체크' | '기프트' | '미확인';

/** 카드의 소유자 타입입니다. 개인, 법인, 미확인 중 하나입니다.
 * 고객이 해외 카드로 결제했거나 간편결제의 결제 수단을 조합해서 결제했을 때 미확인으로 표시됩니다.
 */
type OwnerType = '개인' | '법인' | '미확인';

/** 카드 결제의 매입 상태입니다. */
type AcquireStatus = 'READY' | 'REQUESTED' | 'COMPLETED' | 'CANCEL_REQUESTED' | 'CANCELED';

/** 할부가 적용된 결제에서 할부 수수료를 부담하는 주체입니다. */
type InterestPayer = 'BUYER' | 'CARD_COMPANY' | 'MERCHANT';

/** 카드로 결제하면 제공되는 카드 관련 정보입니다. */
type Card = {
  amount: number;
  issuerCode: string;
  acquirerCode?: string;
  number: string;
  installmentPlanMonths: number;
  approveNo: string;
  useCardPoint: boolean;
  cardType: CardType;
  ownerType: OwnerType;
  acquireStatus: AcquireStatus;
  isInterestFree: boolean;
  interestPayer?: InterestPayer;
}

/** 환불 처리 상태를 나타냅니다. */
type RefundStatus = 'NONE' | 'PENDING' | 'FAILED' | 'PARTIAL_FAILED' | 'COMPLETED';

/** 정산 상태를 나타냅니다. */
type SettlementStatus = 'INCOMPLETED' | 'COMPLETED';

/** 환불계좌 정보입니다. */
type RefundReceiveAccount = {
  bankCode: string; // 은행 코드
  accountNumber: string; // 계좌번호
  holderName: string; // 예금주 정보
}

/** 가상계좌로 결제하면 제공되는 가상계좌 관련 정보입니다. */
type VirtualAccount = {
  accountType: '일반' | '고정'; // 가상계좌 타입
  accountNumber: string; // 발급된 계좌번호
  bankCode: string; // 가상계좌 은행 숫자 코드
  customerName: string; // 가상계좌를 발급한 고객 이름
  dueDate: string; // 입금 기한
  refundStatus: RefundStatus; // 환불 처리 상태
  expired: boolean; // 가상계좌 만료 여부
  settlementStatus: SettlementStatus; // 정산 상태
  refundReceiveAccount?: RefundReceiveAccount; // 환불계좌 정보
}

/** 휴대폰으로 결제하면 제공되는 휴대폰 결제 관련 정보입니다. */
type MobilePhone = {
  customerMobilePhone: string; // 결제에 사용한 휴대폰 번호
  settlementStatus: SettlementStatus; // 정산 상태
  receiptUrl: string; // 휴대폰 결제 내역 영수증 주소
}

/** 상품권으로 결제하면 제공되는 상품권 결제 관련 정보입니다. */
type GiftCertificate = {
  approveNo: string; // 결제 승인번호. 최대 길이는 8자.
  settlementStatus: SettlementStatus; // 정산 상태
}

/** 계좌이체로 결제했을 때 이체 정보가 담기는 객체입니다. */
type Transfer = {
  bankCode: string; // 은행 숫자 코드. 은행 코드와 증권사 코드 참고.
  settlementStatus: SettlementStatus; // 정산 상태
}

/** 발행된 영수증 정보입니다. */
type Receipt = {
  url: string; // 영수증 주소. 각 결제수단별로 다르다.
}

/** 결제창 정보입니다. */
type Checkout = {
  url: string; // 결제창 주소
}

/** 간편결제 정보입니다. */
type EasyPay = {
  provider: string; // 선택한 간편결제사 코드
  amount: number; // 간편결제로 결제한 금액
  discountAmount: number; // 즉시 할인된 금액
}

/** 결제 승인에 실패하면 응답으로 받는 에러 객체입니다. */
type Failure = {
  code: string;    // 오류 타입을 보여주는 에러 코드
  message: string; // 에러 메시지 (최대 길이: 510자)
}

/** 현금영수증 정보입니다. */
type CashReceipt = {
  type: '소득공제' | '지출증빙' | '미발행';  // 현금영수증의 종류
  receiptKey: string;       // 키 값 (최대 길이: 200자)
  issueNumber: string;      // 발급 번호 (최대 길이: 9자)
  receiptUrl: string;       // 영수증 확인 주소
  amount: number;           // 처리된 금액
  taxFreeAmount: number;    // 면세 처리된 금액
}

/** 현금영수증 발행 및 취소 이력 정보입니다. */
type CashReceiptHistory = {
  receiptKey: string;                   // 키 값 (최대 길이: 200자)
  orderId: string;                      // 주문 ID (최소 길이: 6자, 최대 길이: 64자)
  orderName: string;                    // 주문명 (최대 길이: 100자)
  type: '소득공제' | '지출증빙';         // 종류
  issueNumber: string;                  // 발급 번호 (최대 길이: 9자)
  receiptUrl: string;                   // 영수증 확인 주소
  businessNumber: string;               // 사업자등록번호 (길이: 10자)
  transactionType: 'CONFIRM' | 'CANCEL'; // 발급 종류
  amount: number;                       // 처리된 금액
  taxFreeAmount: number;                // 면세 처리된 금액
  issueStatus: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'; // 발급 상태
  failure: Failure;                     // 결제 실패 객체
  customerIdentityNumber: string;       // 소비자 인증수단 (최대 길이: 30자)
  requestedAt: string;                  // 결제 일시 (ISO 8601 형식)
}

/** 카드사의 즉시 할인 프로모션 정보입니다. */
type Discount = {
  amount: number; // 즉시 할인 프로모션을 적용한 금액
}

/** 결제 취소 이력 정보입니다. */
type CancelHistory = {
  cancelAmount: number;            // 취소한 금액
  cancelReason: string;            // 취소 이유 (최대 길이: 200자)
  taxFreeAmount: number;           // 취소된 금액 중 면세 금액
  taxExemptionAmount: number;      // 취소된 금액 중 과세 제외 금액
  refundableAmount: number;        // 환불 가능한 잔액
  easyPayDiscountAmount: number;   // 간편결제 서비스에서 취소된 금액
  canceledAt: string;              // 결제 취소 일시 (ISO 8601 형식)
  transactionKey: string;          // 취소 건의 키 값 (최대 길이: 64자)
  receiptKey?: string;             // 취소 건의 현금영수증 키 값 (최대 길이: 200자, optional)
}

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

type PaymentType = 'NORMAL' | 'BILLING' | 'BRANDPAY';

export interface Payment {
  version: string;
  paymentKey: string;
  type: PaymentType;
  orderId: string;
  orderName: string;
  mId: string;
  currency: string;
  method: PaymentMethod;
  totalAmount: number;
  balanceAmount: number;
  status: PaymentStatus;
  requestedAt: string;
  approvedAt: string;
  useEscrow: boolean;
  lastTransactionKey?: string; // nullable
  suppliedAmount?: number; // optional from v1.3
  vat?: number; // optional from v1.3
  cultureExpense?: boolean; // optional from v1.3, true only for specific payment methods
  taxFreeAmount?: number; // optional from v1.3
  taxExemptionAmount: number;
  cancels?: CancelHistory[]; // nullable
  isPartialCancelable: boolean;
  card?: Card; // nullable
  virtualAccount?: VirtualAccount; // nullable
  secret?: string; // nullable
  mobilePhone?: MobilePhone; // nullable
  giftCertificate?: GiftCertificate; // nullable
  transfer?: Transfer; // nullable
  receipt?: Receipt; // nullable
  checkout?: Checkout; // nullable
  easyPay?: EasyPay; // nullable
  country: string;
  failure?: Failure; // nullable
  cashReceipt?: CashReceipt; // nullable
  cashReceipts?: CashReceiptHistory[]; // nullable
  discount?: Discount; // nullable
}

export interface PaymentWithVirtualAccount extends Payment {
  virtualAccount: VirtualAccount;
}

export interface PaymentWithCard extends Payment {
  card: Card;
}
