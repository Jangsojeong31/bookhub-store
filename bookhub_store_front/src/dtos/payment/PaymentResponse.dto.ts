export interface PaymentResponseDto {
  paymentId: number;
  paymentKey: string;
  paymentMethod: string;
  amount: number;
  status: string;
  orderNumber: string;
  orderName: string;
  requestedAt: string;
  approvedAt: string;
}