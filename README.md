# [TossPayments 결제 API SDK (비공식)](https://docs.tosspayments.com/reference)


![npm](https://img.shields.io/npm/dt/%40yuju/tosspayments-sdk)
[![Install size](https://packagephobia.com/badge?p=%40yuju/tosspayments-sdk)](https://packagephobia.com/result?p=%40yuju/tosspayments-sdk)

## 소개
- [TossPayments 결제 API](https://docs.tosspayments.com/reference)를 사용하기 위한 SDK 입니다.

## 데모
- [데모프로젝트](https://github.com/yujutown/tosspayments-sdk.js-demo)를 참고해주세요.

## 지원
- [x] [결제 API](https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C)
- [x] [자동결제 API](https://docs.tosspayments.com/reference#%EC%9E%90%EB%8F%99%EA%B2%B0%EC%A0%9C)
- [x] [거래 API](https://docs.tosspayments.com/reference#%EA%B1%B0%EB%9E%98)
- [x] [정산 API](https://docs.tosspayments.com/reference#%EC%A0%95%EC%82%B0)
- [x] [현금영수증 API](https://docs.tosspayments.com/reference#%ED%98%84%EA%B8%88%EC%98%81%EC%88%98%EC%A6%9D)
- [ ] [지급대행 API](https://docs.tosspayments.com/reference#%EC%A7%80%EA%B8%89%EB%8C%80%ED%96%89)
- [ ] [카드혜택조회 API](https://docs.tosspayments.com/reference#%EC%B9%B4%EB%93%9C-%ED%98%9C%ED%83%9D-%EC%A1%B0%ED%9A%8C)
- [ ] [브랜드페이 API](https://docs.tosspayments.com/reference/brandpay)

## 사용법

```typescript
import {TossPaymentsApi} from '@yuju/tosspayments-sdk';

const tossPaymentsApi = new TossPaymentsApi("secret_key")
const result = await tossPaymentsApi.payment.confirm({
  paymentKey: "1234",
  amount: 1000,
  orderId: "1234",
});
if (result.success) {
  expect(result.data.balanceAmount).toBe(1000)
} else {
  throw new Error(result.error.message)
}
```

## 설치

- NPM
```bash
$ npm install @yuju/tosspayments-sdk
```

- Yarn
```bash
$ yarn add @yuju/tosspayments-sdk
```

