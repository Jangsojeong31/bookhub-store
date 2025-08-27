export interface OrderListResponseDto {
  orderId: number;
  orderNumber: string;
  orderName: string;

  recipientName: string;
  phoneNumber: string;
  fullAddress: string;
  addressDetail: string;

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
