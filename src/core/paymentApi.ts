import { HttpClient } from '../httpClient.js';
import { Payment } from '../types/paymentType.js';
import { filterUndefined } from '../utils/filterUndefined.js';
import { Result } from '../utils/result.js';
import { TossPaymentsError } from '../utils/tossPaymentsError.js';
import {
  PaymentCancelErrorCode,
  PaymentConfirmErrorCode,
  PaymentInquiryErrorCode,
  PaymentKeyInErrorCode,
} from '../types/errorTypes.js';
import { makeTossPaymentsResult } from '../utils/makeTossPaymentsResult.js';
import {
  PaymentCancelRequest,
  PaymentConfirmRequest,
  PaymentInquiryRequest,
  PaymentKey,
  PaymentKeyInRequestBody,
  validateCancelRequestBody,
} from '../types/requestTypes.js';

/**
 * 결제 API
 */
export class PaymentApi {
  constructor(private client: HttpClient) {

  }

  /**
   * 결제 승인
   * @see https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8
   * @param paymentConfirmRequest 결제 승인 요청
   * @param idempotencyKey 멱등키
   * @return 결제 정보
   */
  async confirm(paymentConfirmRequest: PaymentConfirmRequest, idempotencyKey?: string):
    Promise<Result<Payment, TossPaymentsError<PaymentConfirmErrorCode>>> {
    return makeTossPaymentsResult(async () => {
      return this.client.post<Payment>(filterUndefined({
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      }), '/v1/payments/confirm', paymentConfirmRequest);
    });
  }

  /**
   * 결제 조회
   * @param paymentInquiryRequest 결제 조회 요청
   * @return 결제 정보
   */
  async inquiry(paymentInquiryRequest: PaymentInquiryRequest):
    Promise<Result<Payment, TossPaymentsError<PaymentInquiryErrorCode>>> {
    if (paymentInquiryRequest.paymentKey) {
      return makeTossPaymentsResult(async () => {
        return this.client.get<Payment>('/v1/payments/' + paymentInquiryRequest.paymentKey);
      })
    } else if (paymentInquiryRequest.orderId) {
      return makeTossPaymentsResult(async () => {
        return this.client.get<Payment>('/v1/payments/orders/' + paymentInquiryRequest.orderId);
      });
    }
    throw new Error('paymentKey or orderId is required');
  }

  /**
   * 결제 취소
   * @param paymentKey 결제 키
   * @param paymentCancelRequest 결제 취소 요청
   * @param idempotencyKey 멱등키
   * @return 결제 정보
   */
  async cancel(paymentKey: PaymentKey, paymentCancelRequest: PaymentCancelRequest, idempotencyKey?: string): Promise<Result<Payment, TossPaymentsError<PaymentCancelErrorCode>>> {
    validateCancelRequestBody(paymentCancelRequest)

    return makeTossPaymentsResult(async () => {
      return this.client.post<Payment>(filterUndefined({
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      }), `/v1/payments/${paymentKey}/cancel`, paymentCancelRequest);
    });
  }

  /**
   * 카드 번호로 결제
   * @param paymentKeyInRequest 결제 요청
   * @param idempotencyKey 멱등키
   * @return 결제 정보
   */
  async keyIn(paymentKeyInRequest: PaymentKeyInRequestBody, idempotencyKey?: string):
    Promise<Result<Payment, TossPaymentsError<PaymentKeyInErrorCode>>> {
    return makeTossPaymentsResult(async () => {
      return this.client.post<Payment>(filterUndefined({
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      }), '/v1/payments/key-in', paymentKeyInRequest);
    });
  }
}
