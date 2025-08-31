import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import BookList from "./BookList";
import { useLocation } from "react-router-dom";
import type { AddCartItemRequestDto } from "../../dtos/cart/AddCartItemRequest.dto";
import { addCartItems } from "../../apis/cart";
import useToken from "../../hooks/useToken";
import type { BookSearchResponseDto } from "../../dtos/book/BookSearchResponse.dto";
import { searchBooks } from "../../apis/book";

function BookListPage() {
  const [selectedIsbns, setSelectedIsbns] = useState<string[]>([]);
  const [bookList, setBookList] = useState<BookSearchResponseDto[]>([]);
  const token = useToken();
  
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");

  const fetchBookList = async () => {
    if (!query) {
      alert("검색어가 없습니다.");
      return;
    }

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
    fetchBookList();
  }, [location]);

  const handleAddSelectedToCart = async () => {
    if (selectedIsbns.length === 0) {
      alert("선택된 도서가 없습니다.");
      return;
    }

    const dto: AddCartItemRequestDto[] = selectedIsbns.map((isbn) => ({
      isbn,
      quantity: 1,
    }))

    const res = await addCartItems(dto, token);
    const {code, message} = res;

    if (code == "SU") {
      alert("장바구니에 추가되었습니다.")
      setSelectedIsbns([]);
    } else {
      return;
    }
  };

  return (
    <div
      style={{
        width: "90%",
        minHeight: "calc(100vh - 300px)",
        backgroundColor: "lightblue",
        padding: "20px 20px",

        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>'{query}'에 대한 검색 결과 : {bookList.length}건</div>
        <button onClick={handleAddSelectedToCart}>선택한 상품 장바구니 담기</button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* <div style={{ flex: 1, border: "1px solid black" }}>검색 조건</div> */}
        <div style={{ flex: 4 }}>
          <BookList
          bookList={bookList}
            selectedIsbns={selectedIsbns}
            setSelectedIsbns={setSelectedIsbns}
          />
        </div>
      </div>
    </div>
  );
}

export default BookListPage;
