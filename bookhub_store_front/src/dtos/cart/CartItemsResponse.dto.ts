export interface CartItemsResponseDto {
  id: number;
  isbn: string;
  title: string;
  coverImageURL: string;
  price: number;
  quantity: number;
  totalPrice: number;
}