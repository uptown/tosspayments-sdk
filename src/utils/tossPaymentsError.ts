import { ErrorBody } from '../types/errorTypes.js';

export class TossPaymentsError<ErrorCode extends string> extends Error {
  constructor(private status: number, private error: ErrorBody<ErrorCode>) {
    super(error.message);
  }
}
