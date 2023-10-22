import { HttpClient } from '../httpClient.js';
import { IssueCashReceiptRequest } from '../types/requestTypes.js';
import { Result } from '../utils/result.js';
import { TossPaymentsError } from '../utils/tossPaymentsError.js';
import { CashReceipt } from '../types/cashReceipt.js';
import { makeTossPaymentsResult } from '../utils/makeTossPaymentsResult.js';
import { filterUndefined } from '../utils/filterUndefined.js';
import { CashReceiptCancelErrorCode, CashReceiptInquiryErrorCode } from '../types/errorTypes.js';

/**
 * 현금영수증 API
 */
export class CashReceiptApi {

  constructor(private client: HttpClient) {

  }

  /**
   * 현금영수증 발급
   * @param issueCashReceiptRequest 현금영수증 발급 요청
   * @param idempotencyKey 멱등키
   * @return 현금영수증 정보
   */
  async issue(issueCashReceiptRequest: IssueCashReceiptRequest, idempotencyKey?: string):
    Promise<Result<CashReceipt, TossPaymentsError<string>>> {
    return makeTossPaymentsResult(async () => {
      return this.client.post<CashReceipt>(filterUndefined({
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      }), '/v1/cash-receipts', issueCashReceiptRequest);
    });
  }

  /**
   * 현금영수증 취소
   * @param receiptKey 현금영수증 키
   * @param idempotencyKey 멱등키
   * @return 현금영수증 정보
   */
  async cancel(receiptKey: string, idempotencyKey?: string):
    Promise<Result<CashReceipt, TossPaymentsError<CashReceiptCancelErrorCode>>> {
    return makeTossPaymentsResult(async () => {
      return this.client.post<CashReceipt>(filterUndefined({
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      }), `/v1/cash-receipts/${receiptKey}/cancel`, undefined);
    });
  }

  /**
   * 현금영수증 조회
   * @param cashReceiptInquiryRequest 현금영수증 조회 요청
   * @return 현금영수증 정보
   */
  async inquiry(cashReceiptInquiryRequest: IssueCashReceiptRequest):
    Promise<Result<{
      hasNext: boolean;
      lastCursor: number;
      data: CashReceipt[];  // Assuming CashReceipt type is already defined as provided earlier
    }, TossPaymentsError<CashReceiptInquiryErrorCode>>> {
    return makeTossPaymentsResult(async () => {
      return this.client.get<{
        hasNext: boolean;
        lastCursor: number;
        data: CashReceipt[];
      }>('/v1/cash-receipts', cashReceiptInquiryRequest);
    });

  }
}
