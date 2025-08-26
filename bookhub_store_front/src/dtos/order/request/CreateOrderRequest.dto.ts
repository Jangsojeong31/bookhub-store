export interface CreateOrderRequestDto {
  orderNumber: string;
  orderName: string;
  totalAmount: number;
  address: string;
  
  items: OrderItems[];
}

export interface OrderItems {
  isbn: string;
  bookPrice: number;
  quantity: number;
  totalPrice: number;
}