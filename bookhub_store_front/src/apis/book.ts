import type { AxiosError } from "axios";
import type { BookSearchResponseDto } from "../dtos/book/BookSearchResponse.dto";
import type ResponseDto from "../dtos/Response.dto";
import { axiosInstance, BASE_API, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "./axiosConfig";
import type { BookDetailResponseDto } from "../dtos/book/BookDetailResponse.dto";

// 도서 통합 검색
export const searchBooks = async (query: string, accessToken: string): Promise<ResponseDto<BookSearchResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_API}/books?query=${encodeURIComponent(query)}`,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 도서 상세 정보
export const getBookDetails = async (isbn: string, accessToken: string): Promise<ResponseDto<BookDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_API}/books/${isbn}/details`,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

// 베스트셀러