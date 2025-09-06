import type { AxiosError } from "axios";
import type { BookSearchResponseDto } from "../dtos/book/BookSearchResponse.dto";
import type ResponseDto from "../dtos/Response.dto";
import { axiosInstance, BASE_API_PUBLIC, responseSuccessHandler, responseErrorHandler } from "./axiosConfig";
import type { SignUpRequestDto } from "../dtos/auth/SignUpRequest.dto";
import type { LoginResponseDto } from "../dtos/auth/LoginResponse.dto";
import type { LoginRequestDto } from "../dtos/auth/LoginRequest.dto";
import type { SnsSignUpRequestDto } from "../dtos/auth/SnsSignUpRequest.dto";

export const signUp = async (dto: SignUpRequestDto): Promise<ResponseDto<void>> => {
try {
    const response = await axiosInstance.post(
      `${BASE_API_PUBLIC}/auth/sign-up`,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const snsSignUp = async (userId: number, dto: SnsSignUpRequestDto): Promise<ResponseDto<LoginResponseDto>> => {
try {
    const response = await axiosInstance.put(
      `${BASE_API_PUBLIC}/auth/${userId}/sns-sign-up`,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const snsLogin = async (userId: number): Promise<ResponseDto<LoginResponseDto>> => {
try {
    const response = await axiosInstance.post(
      `${BASE_API_PUBLIC}/auth/${userId}/sns-login`,
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const login = async (dto: LoginRequestDto): Promise<ResponseDto<LoginResponseDto>> => {
try {
    const response = await axiosInstance.post(
      `${BASE_API_PUBLIC}/auth/login`,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const logout = async (): Promise<ResponseDto<void>> => {
try {
    const response = await axiosInstance.post(
      `${BASE_API_PUBLIC}/auth/logout`,
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}



