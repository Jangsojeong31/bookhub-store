import axios, { AxiosError, type AxiosResponse } from "axios";
import type ResponseDto from "../dtos/Response.dto";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN || "http://localhost:8080",
  timeout: 8000,
})

export const BASE_API_USER = "/api/v1/user";
export const BASE_API_PUBLIC = "/api/v1/public";

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401){
      alert("401에러 발생");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
)

// 응답 핸들러
export const responseSuccessHandler = <T = any>(response: AxiosResponse<ResponseDto<T>>) => {
  return response.data;
}

export const responseErrorHandler = (error: AxiosError<ResponseDto>) => {
  if (!error.response) return { code: 'NETWORK_ERROR', message: '네트워크 오류', data: null };
  return error.response.data;
}

// Authorization Bearer 헤더 function
export const bearerAuthorization = (accessToken: string) => ({
  headers: { 'Authorization': `Bearer ${accessToken}` }
}); 