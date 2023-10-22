import { Result } from './result.js';
import { TossPaymentsError } from './tossPaymentsError.js';

export const makeTossPaymentsResult = async <T, CodeKeys extends string>(execution: () => Promise<T>): Promise<Result<T, TossPaymentsError<CodeKeys>>> => {
  try {
    return Result.Success(await execution());
  } catch (error) {
    if (error instanceof TossPaymentsError) {
      return Result.Failure<T, TossPaymentsError<CodeKeys>>(error);
    }
    throw error;
  }
}
