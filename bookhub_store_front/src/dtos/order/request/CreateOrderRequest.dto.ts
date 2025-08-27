export interface CreateOrderRequestDto {
  orderNumber: string;
  orderName: string;
  totalAmount: number;
  addressId: number;
  
  items: OrderItems[];
}

export interface OrderItems {
  isbn: string;
  bookPrice: number;
  quantity: number;
  totalPrice: number;
}