export interface CartItemsResponseDto {
  id: number;
  title: string;
  coverImageURL: string;
  price: number;

  quantity: number;

  totalPrice: number;
}