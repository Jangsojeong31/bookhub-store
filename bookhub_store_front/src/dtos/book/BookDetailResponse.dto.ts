import type { CategoryType } from "../../constants/enums/CategoryType";

export interface BookDetailResponseDto {
  isbn: string;
  title: string;
  coverUrl: string;
  price: number;
  discountPercent: number;
  publishedDate: string;
  description: string;

  authorName: string;
  publisherName: string;

  categoryName: string;
  categoryType: CategoryType;
  parentCategoryName: string;

  language: string;
  pageCount: number;
}