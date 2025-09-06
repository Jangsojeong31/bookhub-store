import type { AxiosError } from "axios";
import type { BookSearchResponseDto } from "../dtos/book/BookSearchResponse.dto";
import type ResponseDto from "../dtos/Response.dto";
import {
  axiosInstance,
  BASE_API_USER,
  bearerAuthorization,
  responseSuccessHandler,
  responseErrorHandler,
} from "./axiosConfig";
import type { CustomerInfoResponseDto } from "../dtos/customer/CustomerInfoResponse.dto";
import type { UpdateNicknameRequestDto } from "../dtos/customer/UpdateNicknameRequest.dto";
import type { UpdateCustomerInfoRequestDto } from "../dtos/customer/UpdateCustomerInfoRequest.dto";
import type { UpdatePasswordRequestDto } from "../dtos/customer/UpdatePasswordRequest.dto";
import type { UpdateProfileImageRequestDto } from "../dtos/customer/UpdateProfileImageRequest.dto";
import type { GetNicknameResponseDto } from "../dtos/customer/response/GetNicknameResponse.dto";
import type { GetProfileImageResponseDto } from "../dtos/customer/response/GetProfileImageResponse.dto";
import type { UploadProfileImageResponseDto } from "../dtos/customer/response/UploadProfileImageResponse.dto";
import type { CustomerResponseDto } from "../dtos/auth/LoginResponse.dto";

// Id로 회원 정보 불러오기
export const getUserInfoById = async (
  userId: number,
): Promise<ResponseDto<CustomerResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_API_USER}/${userId}`,
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// 회원 정보 불러오기 (이메일, 전화번호)
export const getCustomerInfo = async (
  accessToken: string
): Promise<ResponseDto<CustomerInfoResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_API_USER}/me/info`,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// 닉네임 불러오기
export const getMyNickname = async (
  accessToken: string
): Promise<ResponseDto<GetNicknameResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_API_USER}/me/nickname`,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// 프로필 이미지 불러오기
export const getMyProfileImage = async (
  accessToken: string
): Promise<ResponseDto<GetProfileImageResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_API_USER}/me/profile-image`,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// 회원 정보 수정
export const updateCustomerInfo = async (
  dto: UpdateCustomerInfoRequestDto,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(
      `${BASE_API_USER}/me/info`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// 비밀번호 수정
export const updatePassword = async (
  dto: UpdatePasswordRequestDto,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(
      `${BASE_API_USER}/me/info/password`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// 프로필 이미지 업로드
export const uploadProfileImage = async (
  formData: FormData,
  accessToken: string
): Promise<ResponseDto<UploadProfileImageResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      `${BASE_API_USER}/me/profile-image/upload`,
      formData,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// 프로필 이미지 업데이트
export const updateProfileImage = async (
  dto: UpdateProfileImageRequestDto,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(
      `${BASE_API_USER}/me/profile-image`,
      dto,
      bearerAuthorization(accessToken)
    );

    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

// 닉네임 변경
export const updateNickname = async (
  dto: UpdateNicknameRequestDto,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(
      `${BASE_API_USER}/me/nickname`,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
