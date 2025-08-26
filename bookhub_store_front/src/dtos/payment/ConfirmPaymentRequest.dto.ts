export interface ConfirmPaymentRequestDto {
  paymentKey: string;
  orderId: string;
  amount: string;
}