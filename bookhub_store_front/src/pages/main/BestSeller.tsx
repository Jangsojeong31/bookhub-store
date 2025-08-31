import React, { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { getBestSellerByCategory } from "../../apis/book";
import type { BestSellerDto } from "../../dtos/book/BestSeller.dto";
import { useNavigate } from "react-router-dom";
import "./BestSeller.css";

function BestSeller() {
  const token = useToken();
  const navigate = useNavigate();
  const [categoryType, setCategoryType] = useState<number>(1);
  const [bestSeller, setBestSeller] = useState<BestSellerDto[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const fetchBestSeller = async () => {
    const res = await getBestSellerByCategory(categoryType, token);
    const { code, message, data } = res;

    if (code === "SU" && data) {
      setBestSeller(data);
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    if (categoryType !== null) {
      fetchBestSeller();
    }
  }, [categoryType]);

  const prevBook = () => {
    setCurrentIndex((prev) => (prev === 0 ? bestSeller.length - 1 : prev - 1));
  };

  const nextBook = () => {
    setCurrentIndex((prev) => (prev === bestSeller.length - 1 ? 0 : prev + 1));
  };

  const currentBook = bestSeller[currentIndex];

  const goDetail = (isbn: string) => {
    navigate(`/books/details?isbn=${isbn}`);
  };

  return (
    <div className="best-seller-container">
      <h2 className="best-seller-title">이 달의 베스트셀러</h2>

      <div className="best-seller-content">
        <div className="category-buttons">
          <button
            onClick={() => setCategoryType(1)}
            className={categoryType === 1 ? "active" : ""}
          >
            국내도서
          </button>
          <button
            onClick={() => setCategoryType(2)}
            className={categoryType === 2 ? "active" : ""}
          >
            해외도서
          </button>
        </div>

        <div className="book-carousel-container">
          {currentBook && (
            <div className="book-carousel">
              <button onClick={prevBook} className="carousel-btn">
                ◀
              </button>

              <div className="book-info-wrapper">
                <div className="book-rank">
                  <span className="rank-badge">{currentIndex + 1}위</span>
                  <div>{currentBook.totalSales}권 판매</div>
                </div>

                  <div className="book-cover">
                    <img
                      src={currentBook.coverUrl}
                      alt={currentBook.bookTitle}
                    />
                  </div>

                <div
                  className="book-meta"
                  onClick={() => goDetail(currentBook.bookIsbn)}
                >
                  <div className="book-title">{currentBook.bookTitle}</div>
                  <div>{currentBook.authorName}</div>
                  <div>{currentBook.categoryName}</div>
                  <div>{currentBook.publisherName}</div>
                </div>
              </div>

              <button onClick={nextBook} className="carousel-btn">
                ▶
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
