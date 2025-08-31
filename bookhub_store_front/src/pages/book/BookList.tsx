import React, { useEffect, useState } from "react";
import type { BookSearchResponseDto } from "../../dtos/book/BookSearchResponse.dto";
import { Link, useNavigate } from "react-router-dom";
import AddCartItems from "../cart/AddCartItems";

interface BookListProps {
  bookList: BookSearchResponseDto[];
  selectedIsbns: string[];
  setSelectedIsbns: React.Dispatch<React.SetStateAction<string[]>>;
}

function BookList({
  bookList,
  selectedIsbns,
  setSelectedIsbns,
}: BookListProps) {
  const navigate = useNavigate();

  const handleCheckboxChange = (isbn: string) => {
    setSelectedIsbns((prev) =>
      prev.includes(isbn) ? prev.filter((i) => i !== isbn) : [...prev, isbn]
    );
  };

  const goDetail = (isbn: string) => {
    navigate(`/books/details?isbn=${isbn}`);
  };

  const bookListResult = bookList.map((book) => {
    return (
      <div
        style={{
          backgroundColor: "white",

          height: 250,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 10px",
          margin: 10,
          gap: 12,
        }}
      >
        <input
          type="checkbox"
          checked={selectedIsbns.includes(book.isbn)}
          onChange={() => handleCheckboxChange(book.isbn)}
        />
        <div
          style={{
            border: "1px solid black",
            aspectRatio: "3.5/5",
            height: "90%",
          }}
          onClick={() => goDetail(book.isbn)}
        >
          <p>표지</p>
        </div>
        <div style={{ flex: 2 }} onClick={() => goDetail(book.isbn)}>
          <p>{book.title}</p>
          <p>{book.authorName}</p>
          <p>{book.publisherName}</p>
          <p>{book.publishedDate}</p>
          <p>{book.price}</p>
          <p>{book.categoryName}</p>
          {/* <p>{book.events.}</p> */}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <AddCartItems isbn={book.isbn} resetQuantity={() => { return; }} />
          <button>바로구매 버튼</button>
        </div>
      </div>
    );
  });
  return <div>{bookListResult}</div>;
}

export default BookList;
