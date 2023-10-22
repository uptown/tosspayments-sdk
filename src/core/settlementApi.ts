import { HttpClient } from '../httpClient.js';
import { filterUndefined } from '../utils/filterUndefined.js';
import { Result } from '../utils/result.js';
import { TossPaymentsError } from '../utils/tossPaymentsError.js';
import { SettlementInquiryErrorCode, SettlementManuallyErrorCode } from '../types/errorTypes.js';
import { makeTossPaymentsResult } from '../utils/makeTossPaymentsResult.js';
import { SettlementInquiryRequest, SettlementManuallyRequest } from '../types/requestTypes.js';
import { Settlement } from '../types/settlementType.js';

/**
 * 정산 API
 */
export class SettlementApi {
  constructor(private client: HttpClient) {

  }

  /**
   * 정산 조회
   * @param settlementInquiryRequest 정산 조회 요청
   * @return 정산 정보
   */
  async inquiry(settlementInquiryRequest: SettlementInquiryRequest): Promise<Result<Settlement[], TossPaymentsError<SettlementInquiryErrorCode>>> {
    return makeTossPaymentsResult(async () => {
      return this.client.get<Settlement[]>(`/v1/settlements`, settlementInquiryRequest);
    });
  }

  /**
   * 정산 수동 처리
   * @param settlementManuallyRequest 정산 수동 처리 요청
   * @param idempotencyKey idempotency key
   * @return 정산 수동 처리 결과
   */
  async manualConfirm(settlementManuallyRequest: SettlementManuallyRequest, idempotencyKey?: string): Promise<Result<{
    result: true
  }, TossPaymentsError<SettlementManuallyErrorCode>>> {
    return makeTossPaymentsResult(async () => {
      return this.client.post<{ result: true }>(filterUndefined({
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      }), `/v1/settlements`, settlementManuallyRequest);
    });
  }
}
