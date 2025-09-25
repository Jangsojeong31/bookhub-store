import type { AxiosError } from "axios";
import type ResponseDto from "../dtos/Response.dto";
import { axiosInstance, BASE_API_PUBLIC, responseSuccessHandler, responseErrorHandler } from "./axiosConfig";
import type { EmailVerifyRequestDto } from "../dtos/email/EmailVerifyRequest.dto";

export const checkDuplicatedEmail = async (email: string): Promise<ResponseDto<void>> => {
try {
    const response = await axiosInstance.get(
      `${BASE_API_PUBLIC}/auth/check-duplicated-email?email=${encodeURIComponent(email)}`,
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const sendCodeEmail = async (email: string): Promise<ResponseDto<void>> => {
try {
    const response = await axiosInstance.post(
      `${BASE_API_PUBLIC}/email?email=${encodeURIComponent(email)}`,
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const verifyCode = async (dto: EmailVerifyRequestDto): Promise<ResponseDto<void>> => {
try {
    const response = await axiosInstance.post(
      `${BASE_API_PUBLIC}/email/verification`,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}