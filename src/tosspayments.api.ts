import type { OPTIONS } from './types/commonTypes.js';
import { HttpClient } from './httpClient.js';
import { LazyLoader } from './utils/lazyLoader.js';
import { PaymentApi } from './core/paymentApi.js';
import { VirtualAccountApi } from './core/virtualAccountApi.js';
import { BillingApi } from './core/billingApi.js';
import { SettlementApi } from './core/settlementApi.js';
import { TransactionApi } from './core/transactionApi.js';
import { CashReceiptApi } from './core/cashReceiptApi.js';

/**
 * TossPayments API
 */
export class TossPaymentsApi {
  private paymentApiLoader: LazyLoader<PaymentApi>;
  private virtualAccountApiLoader: LazyLoader<VirtualAccountApi>;
  private billingApiLoader: LazyLoader<BillingApi>;
  private settlementApiLoader: LazyLoader<SettlementApi>;
  private transactionApiLoader: LazyLoader<TransactionApi>;
  private cashReceiptApiLoader: LazyLoader<CashReceiptApi>;

  /**
   * TossPayments API 생성
   * @param secretKey API Secret Key
   * @param options version, endpoint
   */
  constructor(private secretKey: string, private options: OPTIONS = {
    version: '2022-06-08',
    endpoint: 'https://api.tosspayments.com',
  }) {
    if (options.version != '2022-06-08') {
      throw new Error(`TossPaymentsApi version is 2022-06-08, but you set ${options.version} in options.`);
    }
    this.paymentApiLoader = new LazyLoader(
      () => new PaymentApi(new HttpClient(this.options.endpoint, this.secretKey)));
    this.virtualAccountApiLoader = new LazyLoader(
      () => new VirtualAccountApi(new HttpClient(this.options.endpoint, this.secretKey)));
    this.billingApiLoader = new LazyLoader(
      () => new BillingApi(new HttpClient(this.options.endpoint, this.secretKey)));
    this.settlementApiLoader = new LazyLoader(
      () => new SettlementApi(new HttpClient(this.options.endpoint, this.secretKey)));
    this.transactionApiLoader = new LazyLoader(
      () => new TransactionApi(new HttpClient(this.options.endpoint, this.secretKey)));
    this.cashReceiptApiLoader = new LazyLoader(
      () => new CashReceiptApi(new HttpClient(this.options.endpoint, this.secretKey)));
  }

  /**
   * 결제 API
   */
  get paymentApi(): PaymentApi {
    return this.paymentApiLoader.get();
  }

  /**
   * 가상계좌 API
   */
  get virtualAccountApi(): VirtualAccountApi {
    return this.virtualAccountApiLoader.get();
  }

  /**
   * 정기결제 API
   */
  get billingApi(): BillingApi {
    return this.billingApiLoader.get();
  }

  /**
   * 정산 API
   */
  get settlementApi(): SettlementApi {
    return this.settlementApiLoader.get();
  }

  /**
   * 거래내역 API
   */
  get transactionApi(): TransactionApi {
    return this.transactionApiLoader.get();
  }

  /**
   * 현금영수증 API
   */
  get cashReceiptApi(): CashReceiptApi {
    return this.cashReceiptApiLoader.get();
  }
}
