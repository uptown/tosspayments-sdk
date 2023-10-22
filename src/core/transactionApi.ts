import { HttpClient } from '../httpClient.js';
import { Result } from '../utils/result.js';
import { TossPaymentsError } from '../utils/tossPaymentsError.js';
import { TransactionInquiryErrorCode } from '../types/errorTypes.js';
import { makeTossPaymentsResult } from '../utils/makeTossPaymentsResult.js';
import { TransactionInquiryRequest } from '../types/requestTypes.js';
import { Transaction } from '../types/transactionType.js';

/**
 * 거래 API
 */
export class TransactionApi {
  constructor(private client: HttpClient) {

  }

  /**
   * 거래 조회
   * @param transactionInquiryRequest 거래 조회 요청
   * @return 거래 정보
   */
  async inquiry(transactionInquiryRequest: TransactionInquiryRequest): Promise<Result<Transaction[], TossPaymentsError<TransactionInquiryErrorCode>>> {
    return makeTossPaymentsResult(async () => {
      return this.client.get<Transaction[]>(`/v1/transactions`, transactionInquiryRequest);
    });
  }
}
