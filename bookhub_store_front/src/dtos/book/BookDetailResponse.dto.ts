import type { CategoryType } from "../../constants/enums/CategoryType";
import type { BookEventDto } from "./BookEvent.dto";

export interface BookDetailResponseDto {
  isbn: string;
  title: string;
  bookCoverUrl: string;
  price: number;
  publishedDate: string;
  description: string;

  authorName: string;
  
  publisherName: string;

  categoryName: string;
  categoryType: CategoryType;
  parentCategoryName: string;

  events: BookEventDto[];
}