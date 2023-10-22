import { HttpClient } from '../httpClient.js';
import { PaymentWithVirtualAccount } from '../types/paymentType.js';
import { filterUndefined } from '../utils/filterUndefined.js';
import { Result } from '../utils/result.js';
import { TossPaymentsError } from '../utils/tossPaymentsError.js';
import { IssueVirtualAccountErrorCode } from '../types/errorTypes.js';
import { makeTossPaymentsResult } from '../utils/makeTossPaymentsResult.js';
import { IssueVirtualAccountRequest } from '../types/requestTypes.js';

/**
 * 가상계좌 API
 */
export class VirtualAccountApi {
  constructor(private client: HttpClient) {

  }

  /**
   * 가상계좌 발급
   * @param issueVirtualAccountRequest 가상계좌 발급 요청
   * @param idempotencyKey 멱등키
   * @return 결제 정보 (가상계좌)
   */
  async issue(issueVirtualAccountRequest: IssueVirtualAccountRequest, idempotencyKey?: string): Promise<Result<PaymentWithVirtualAccount, TossPaymentsError<IssueVirtualAccountErrorCode>>> {
    return makeTossPaymentsResult(async () => {
      return this.client.post(filterUndefined({
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      }), '/v1/virtual-accounts', issueVirtualAccountRequest);
    });
  }
}
