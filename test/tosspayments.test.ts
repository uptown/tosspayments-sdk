import { expect } from "@jest/globals";
import { TossPaymentsApi } from "../dist";

describe("TossPaymentsApi", function () {
  const tossPaymentsApi = new TossPaymentsApi("test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R")
  test("paymentConfirm", async function () {
    const result = await tossPaymentsApi.paymentApi.confirm({
      paymentKey: "1234",
      amount: 1000,
      orderId: "1234",
    });
    console.log(result)
    console.assert(result.success, "결제 승인 실패")

    if (result.success) {
      expect(result.data.balanceAmount).toBe(1000)
    }
  })
})
