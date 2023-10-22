import { HttpClient } from '../httpClient.js';
import { PaymentWithCard } from '../types/paymentType.js';
import { filterUndefined } from '../utils/filterUndefined.js';
import { Result } from '../utils/result.js';
import { TossPaymentsError } from '../utils/tossPaymentsError.js';
import { BillingConfirmErrorCode, IssueBillingKeyErrorCode } from '../types/errorTypes.js';
import { makeTossPaymentsResult } from '../utils/makeTossPaymentsResult.js';
import {
  BillingConfirmRequest,
  IssueBillingKeyWithAuthKeyRequest,
  IssueBillingKeyWithCustomerKeyRequest,
  validateIssueBillingKeyWithCustomerKey,
} from '../types/requestTypes.js';
import { Billing } from '../types/billingType.js';

/**
 * 빌링 API
 */
export class BillingApi {
  constructor(private client: HttpClient) {

  }

  /**
   * 빌링키 발급 with 고객키
   * @param issueBillingKeyWithCustomerKeyRequest 빌링키 발급 요청
   * @param idempotencyKey 멱등키
   * @return 빌링 정보
   */
  async issueWithCustomerKey(issueBillingKeyWithCustomerKeyRequest: IssueBillingKeyWithCustomerKeyRequest, idempotencyKey?: string): Promise<Result<Billing, TossPaymentsError<IssueBillingKeyErrorCode>>> {
    validateIssueBillingKeyWithCustomerKey(issueBillingKeyWithCustomerKeyRequest)
    return makeTossPaymentsResult(async () => {
      return this.client.post(filterUndefined({
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      }), '/v1/billing/authorizations/card', issueBillingKeyWithCustomerKeyRequest);
    });
  }

  /**
   * 빌링키 발급 with 인증키
   * @param issueBillingKeyWithAuthKeyRequest 빌링키 발급 요청
   * @param idempotencyKey 멱등키
   * @return 빌링 정보
   */
  async issueWithAuthKey(issueBillingKeyWithAuthKeyRequest: IssueBillingKeyWithAuthKeyRequest, idempotencyKey?: string): Promise<Result<Billing, TossPaymentsError<IssueBillingKeyErrorCode>>> {
    return makeTossPaymentsResult(async () => {
      return this.client.post(filterUndefined({
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      }), '/v1/billing/authorizations/issue', issueBillingKeyWithAuthKeyRequest);
    });
  }

  /**
   * 빌링키 결제
   * @param billingKey 빌링키
   * @param billingConfirmRequest 빌링키 결제 요청
   * @param idempotencyKey 멱등키
   * @return 결제 정보 (카드)
   */
  async bill(billingKey: string, billingConfirmRequest: BillingConfirmRequest, idempotencyKey?: string): Promise<Result<PaymentWithCard, TossPaymentsError<BillingConfirmErrorCode>>> {
    return makeTossPaymentsResult(async () => {
      return this.client.post(filterUndefined({
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      }), `/v1/billing/${billingKey}`, billingConfirmRequest);
    });
  }
}
