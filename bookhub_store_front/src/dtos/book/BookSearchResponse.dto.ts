import type { CategoryType } from "../../constants/enums/CategoryType";
import type { BookEventDto } from "./BookEvent.dto";

export interface BookSearchResponseDto {
  isbn: string;
  title: string;
  bookCoverUrl: string;
  price: number;
  publishedDate: string;

  authorName: string;
  
  publisherName: string;

  categoryName: string;
  categoryType: CategoryType;
  parentCategoryName: string;

  events: BookEventDto[];
}