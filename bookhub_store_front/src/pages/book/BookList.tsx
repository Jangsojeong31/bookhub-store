import React, { useEffect, useState } from "react";
import { searchBooks } from "../../apis/book";
import { useCookies } from "react-cookie";
import type { BookSearchResponseDto } from "../../dtos/book/BookSearchResponse.dto";
import BookListElement from "./BookListElement";

interface BookListProps {
  query: string;
}

function BookList({ query }: BookListProps) {
  const [bookList, setBookList] = useState<BookSearchResponseDto[]>([]);
  const [cookies] = useCookies(["accessToken"]);

  const fetchBookList = async () => {
    const token = cookies.accessToken;
    const res = await searchBooks(query, token);
    const { code, message, data } = res;

    if (code != "success") {
      setBookList([]);
      return;
    }

    if (Array.isArray(data)) {
      setBookList(data);
    } else {
      setBookList([]);
      alert("검색 결과가 없습니다.");
    }
  };

  useEffect(() => {
    if (!query) return;
    fetchBookList();
  }, [query]);

  return (
    <div>
      <BookListElement bookList={bookList} />
    </div>
  );
}

export default BookList;
