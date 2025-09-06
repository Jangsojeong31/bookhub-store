import type { AxiosError } from "axios";
import type ResponseDto from "../dtos/Response.dto";
import {
  axiosInstance,
  BASE_API_USER,
  bearerAuthorization,
  responseSuccessHandler,
  responseErrorHandler,
} from "./axiosConfig";
import type { CreateOrderRequestDto } from "../dtos/order/request/CreateOrderRequest.dto";
import type { OrderListResponseDto } from "../dtos/order/OrderListResponse.dto";

export const createOrder = async (
  dto: CreateOrderRequestDto,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(
      `${BASE_API_USER}/orders`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getMyOrders = async (
  accessToken: string
): Promise<ResponseDto<OrderListResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_API_USER}/orders`,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

