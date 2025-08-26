export interface OrderListResponseDto {
  orderId: number;
  orderNumber: string;
  orderName: string;
  customerEmail: string;
  address: string;
  totalAmount: number;
  paymentMethod: string;
  orderDate: string;
  status: string;

  orderDetails: OrderDetailResponseDto[];
}

export interface OrderDetailResponseDto {
  orderDetailId: number;
  coverUrl: string;
  bookTitle: string;
  bookPrice: number;
  quantity: number;
  totalPrice: number;
}