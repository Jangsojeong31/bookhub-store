export interface CartItemsResponseDto {
  id: number;
  isbn: string;
  title: string;
  coverImageUrl: string;
  price: number;
  discountRate: number;
  discountedPrice: number;
  quantity: number;
  totalPrice: number;
}