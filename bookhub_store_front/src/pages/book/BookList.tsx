import React, { useEffect, useState } from "react";
import type { BookSearchResponseDto } from "../../dtos/book/BookSearchResponse.dto";
import { Link, useNavigate } from "react-router-dom";
import AddCartItems from "../cart/AddCartItems";
import "./BookList.css";

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
      const publishedDate = book.publishedDate;
      const [year, month, day] = publishedDate.split("-");
      const formattedPublishedDate = `${year}년 ${month}월 ${day}일`;


    return (
      <div className="bookListElement">
        <input
          type="checkbox"
          checked={selectedIsbns.includes(book.isbn)}
          onChange={() => handleCheckboxChange(book.isbn)}
        />
        <div className="cover" onClick={() => goDetail(book.isbn)}>
          <img src={book.coverUrl} alt={book.title}></img>
        </div>
        <div className="content" onClick={() => goDetail(book.isbn)}>
          <p>
            <strong>{book.title}</strong>
          </p>
          <p>{book.authorName} 저자</p>
          <p className="publisher">
            {book.publisherName} · {formattedPublishedDate}
          </p>
          {book.discountPercent != null
                ? <div className="priceContainer">
                  <p className="discountPercent">{book.discountPercent}%</p> 
                  <p>{book.price! * (100 - book.discountPercent) / 100}원</p> 
                  <p className="originalPrice">{book.price}원</p>
                  </div>
                : <p>{book.price}원</p>}
        </div>
        <div className="buttons">
          <AddCartItems
            isbn={book.isbn}
            resetQuantity={() => {
              return;
            }}
          />
          {/* <button className="button">바로구매 버튼</button> */}
        </div>
      </div>
    );
  });
  return <div>{bookListResult}</div>;
}

export default BookList;
