import React, { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { getNewBooks } from "../../apis/book";
import type { BookSearchResponseDto } from "../../dtos/book/BookSearchResponse.dto";
import { useNavigate } from "react-router-dom";

function NewRelease() {
  const token = useToken();
  const [newBooks, setNewBooks] = useState<BookSearchResponseDto[]>([]);
  const navigate = useNavigate();

  const fetchNewBooks = async () => {
    const res = await getNewBooks();

    const { code, message, data } = res;

    if (code != null && data) {
      setNewBooks(data);
    }
  };

  useEffect(() => {
    fetchNewBooks();
  }, []);

  const goDetail = (isbn: string) => {
    navigate(`/books/details?isbn=${isbn}`);
  };

  const newBookList = newBooks.map((book) => {
    return (
      <div className="newBooksElement">
        <div className="cover" onClick={() => goDetail(book.isbn)}>
          <img src={book.coverUrl} alt={book.title} />
        </div>
        <div className="title" onClick={() => goDetail(book.isbn)}>
          {book.title}
        </div>
        <div className="content">
          <p>{book.authorName}</p>
          <span>
            {book.publisherName} · {book.publishedDate}
          </span>
        </div>
      </div>
    );
  });

  return (
    <div style={{marginTop: 30,}}>
      <div className="newReleaseTitleContainer">
        <h3 className="newReleaseTitle">화제의 신작</h3>
      </div>
      <div className="newReleaseContainer">{newBookList}</div>
    </div>
  );
}

export default NewRelease;
