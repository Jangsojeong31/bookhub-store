import type { AxiosError } from "axios";
import type ResponseDto from "../dtos/Response.dto";
import {
  axiosInstance,
  BASE_API,
  bearerAuthorization,
  responseSuccessHandler,
  responseErrorHandler,
} from "./axiosConfig";
import type { CreateOrderRequestDto } from "../dtos/order/request/CreateOrderRequest.dto";

export const createOrder = async (
  dto: CreateOrderRequestDto,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(
      `${BASE_API}/orders`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
