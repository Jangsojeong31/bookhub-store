import React, { useEffect, useState } from "react";
import { getBookDetails } from "../../apis/book";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import type { BookDetailResponseDto } from "../../dtos/book/BookDetailResponse.dto";
import AddCartItems from "../cart/AddCartItems";
import "./BookList.css";

function BookDetail() {
  const [cookies] = useCookies(["accessToken"]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [bookDetail, setBookDetail] = useState<BookDetailResponseDto>();
  const [publishedDate, setPublishedDate] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  const onGetBookDetail = async () => {
    const token = cookies.accessToken;
    const isbn = params.get("isbn") || "";

    const res = await getBookDetails(isbn, token);

    const { code, message, data } = res;

    if (code != "success" && data) {
      return;
    } else {
      setBookDetail(data);
      setPublishedDate(data?.publishedDate!);
    }
  };

  const [year, month, day] = publishedDate.split("-");
  const formattedPublishedDate = `${year}년 ${month}월 ${day}일`;

  const onDecreaseQuantity = () => {
    if (quantity == 1) return;
    setQuantity((prev) => prev - 1);
  };

  const onIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  useEffect(() => {
    onGetBookDetail();
  }, [location.search]);

  return (
    <div className="detailContainer">
      <div className="title">
        <p>
          <strong>{bookDetail?.title}</strong>
        </p>
        <p className="category">
          {bookDetail?.categoryType == "DOMESTIC" ? "국내도서" : "해외도서"} {" > "}{" "}
          {bookDetail?.parentCategoryName
            ? bookDetail.parentCategoryName + " > "
            : ""}
          {bookDetail?.categoryName}
        </p>
      </div>
      <div className="detailElementContainer1">
        <div className="authorPublisher">
          <p>
            <strong>{bookDetail?.authorName} 저자</strong>
          </p>
          <p style={{ color: "#888888" }}>
            {bookDetail?.publisherName} · {formattedPublishedDate}
          </p>
          {bookDetail?.discountPercent != null ? (
            <div className="priceContainer">
              <p className="discountPercent">{bookDetail?.discountPercent}%</p>
              <p>
                {(bookDetail?.price! * (100 - bookDetail.discountPercent)) /
                  100}
                원
              </p>
              <p className="originalPrice">{bookDetail?.price}원</p>
            </div>
          ) : (
            <p>{bookDetail?.price}원</p>
          )}
        </div>
        <div className="cover">
          <img src={bookDetail?.coverUrl} alt={bookDetail?.title} />
        </div>

        <div className="buttonAddCartContainer">
          <div className="buttonInputContainer">
            <button
              onClick={onDecreaseQuantity}
              className="changQuantitybutton"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="quantityInput"
            />
            <button
              onClick={onIncreaseQuantity}
              className="changQuantitybutton"
            >
              +
            </button>
          </div>
          <div style={{ width: "200px"}}>
            <AddCartItems
              isbn={bookDetail?.isbn!}
              quantity={quantity}
              resetQuantity={() => setQuantity(1)}
            />
          </div>
        </div>
      </div>
      <div className="detailElementContainer2">
        <div className="description">{bookDetail?.description}</div>
        <div className="crossLine"></div>
        <div className="bookInfo">
          <p><strong>ISBN</strong>{bookDetail?.isbn}</p>
          <p><strong>쪽수</strong>{bookDetail?.pageCount} 쪽</p>
          <p><strong>언어</strong>{bookDetail?.language == "Korean" ? "한국어" : "외국어"}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
