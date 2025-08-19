export default interface ResponseDto<T = any> {
  code: string; // 응답 코드
  message: string; // 응답 메시지
  data?: T; // 응답 데이터
}