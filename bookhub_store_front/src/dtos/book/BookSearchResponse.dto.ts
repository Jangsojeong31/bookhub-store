import type { CategoryType } from "../../constants/enums/CategoryType";

export interface BookSearchResponseDto {
  isbn: string;
  title: string;
  coverUrl: string;
  price: number;
  discountPercent: number;
  publishedDate: string;

  authorName: string;
  publisherName: string;

  categoryName: string;
  categoryType: CategoryType;
  parentCategoryName: string;
}