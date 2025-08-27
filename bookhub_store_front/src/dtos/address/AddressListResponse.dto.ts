export interface AddressListResponseDto {
  id: number;
  recipientName: string;
  phoneNumber: string;
  postalCode: string;
  fullAddress: string;
  detailAddress: string;
  defaultAddress: boolean;
}