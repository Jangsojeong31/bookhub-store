export interface LoginResponseDto {
  token: string;
  exprTime: number;
  user: CustomerResponseDto;
}

export interface CustomerResponseDto {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  profileImageUrl: string;
  socialProvider: string;
}