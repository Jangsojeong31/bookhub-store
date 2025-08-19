import React from 'react'
import type { BookSearchResponseDto } from '../../dtos/book/BookSearchResponse.dto'
import AddCartItems from '../cart/AddCartItems';
import BookDetail from './BookDetail';
import { Link } from 'react-router-dom';

interface BookListElementProps {
  bookList: BookSearchResponseDto[];
}

function BookListElement({bookList}: BookListElementProps) {
  const bookListResult = bookList.map((book) => {
      return (
        <div style={{backgroundColor: "white", width: 800, height: 200, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 10px", margin: 10,gap: 12,
    }}>
      <div>체크박스</div>
      <div style={{border: "1px solid black", flex: 1, height: "90%"}}><p>표지</p></div>
      <div style={{flex: 2}}>
        <p>{book.title}</p>
        <p>{book.authorName}</p>
        <p>{book.publisherName}</p>
        <p>{book.publishedDate}</p>
        <p>{book.price}</p>
        <p>{book.categoryName}</p>
        {/* <p>{book.events.}</p> */}
        </div>
      <div style={{flex: 1}}>
        <Link to={`/books/details?isbn=${book.isbn}`}>상세 보기</Link>
        <AddCartItems isbn={book.isbn}/>
        바로구매 버튼
      </div>
    </div>
      );
    });
  return (
    <>
    {bookListResult}
    </>
  )
}

export default BookListElement