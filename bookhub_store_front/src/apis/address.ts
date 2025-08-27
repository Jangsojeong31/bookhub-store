import type { AxiosError } from "axios";
import type ResponseDto from "../dtos/Response.dto";
import { axiosInstance, BASE_API, bearerAuthorization, responseSuccessHandler, responseErrorHandler } from "./axiosConfig";
import type { CreateAddressRequestDto } from "../dtos/address/CreateAddressRequest.dto";
import type { AddressListResponseDto } from "../dtos/address/AddressListResponse.dto";

// 배송지 추가
export const addDeliveryAddress = async (dto: CreateAddressRequestDto, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(
      `${BASE_API}/address`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 배송지 목록 조회
export const getAllAddresses = async (accessToken: string): Promise<ResponseDto<AddressListResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_API}/address`,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}