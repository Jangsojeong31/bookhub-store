import type { AxiosError } from "axios";
import type ResponseDto from "../dtos/Response.dto";
import { axiosInstance, BASE_API, bearerAuthorization, responseSuccessHandler, responseErrorHandler } from "./axiosConfig";
import type { ConfirmPaymentRequestDto } from "../dtos/payment/ConfirmPaymentRequest.dto";
import type { PaymentResponseDto } from "../dtos/payment/PaymentResponse.dto";

export const confirmPayment = async (
  dto: ConfirmPaymentRequestDto,
  accessToken: string
): Promise<ResponseDto<PaymentResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      `${BASE_API}/payments/confirm`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};