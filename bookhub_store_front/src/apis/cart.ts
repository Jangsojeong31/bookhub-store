import type { AxiosError } from "axios";
import type { BookSearchResponseDto } from "../dtos/book/BookSearchResponse.dto";
import type ResponseDto from "../dtos/Response.dto";
import { axiosInstance, BASE_API, bearerAuthorization, responseSuccessHandler, responseErrorHandler } from "./axiosConfig";
import type { AddCartItemRequestDto } from "../dtos/cart/AddCartItemRequest.dto";
import type { CartItemsResponseDto } from "../dtos/cart/CartItemsResponse.dto";
import type { CartItemIdRequestDto } from "../dtos/cart/CartItemIdRequest.dto";
import type { RemoveCartItemRequestDto } from "../dtos/cart/RemoveCartItemRequest.dto";

// 장바구니 담기
export const addCartItems = async (dto: AddCartItemRequestDto[], accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(
      `${BASE_API}/cart/items`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 장바구니 목록 조회 
export const getCartItems = async (accessToken: string): Promise<ResponseDto<CartItemsResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_API}/cart/items`,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 장바구니에서 선택한 목록 조회 (주문페이지)
// export const getCartItemsToOrder = async (dto: CartItemIdRequestDto[] ,accessToken: string): Promise<ResponseDto<CartItemsResponseDto[]>> => {
//   try {
//     const response = await axiosInstance.get(
//       `${BASE_API}/cart/ordering-items`,
//       dto,
//       bearerAuthorization(accessToken)
//     );
//     return responseSuccessHandler(response);
//   } catch (error) {
//     return responseErrorHandler(error as AxiosError<ResponseDto>);
//   }
// }

// 장바구니 수량 변경 - 증가
export const increaseQuantity = async (cartItemId: number, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(
      `${BASE_API}/cart/items/${cartItemId}/increase`,
      {},
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 장바구니 수량 변경 - 감소
export const decreaseQuantity = async (cartItemId: number, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(
      `${BASE_API}/cart/items/${cartItemId}/decrease`,
      {},
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 장바구니 아이템 삭제 (개별 삭제 || 주문 시 장바구니 비우기)
export const removeCartItems = async (dto: RemoveCartItemRequestDto, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(
      `${BASE_API}/cart/remove`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}