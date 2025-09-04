import React, { useEffect, useState } from "react";
import { getBookDetails } from "../../apis/book";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import type { BookDetailResponseDto } from "../../dtos/book/BookDetailResponse.dto";
import AddCartItems from "../cart/AddCartItems";
import "./BookList.css"

function BookDetail() {
  const [cookies] = useCookies(["accessToken"]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [bookDetail, setBookDetail] = useState<BookDetailResponseDto>();
  const [quantity, setQuantity] = useState<number>(1);

  const onGetBookDetail = async () => {
    const token = cookies.accessToken;
    const isbn = params.get("isbn") || "";

    const res = await getBookDetails(isbn, token);

    const { code, message, data } = res;

    if (code != "success") {
      return;
    } else {
      setBookDetail(data);
    }
  };

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
    
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          maxWidth: 1300,
          height: "90%",
        }}
      >
        <div style={{ height: 100, textAlign: "center" }}>
          <p>
            <strong>{bookDetail?.title}</strong>
          </p>
          <p>
            {bookDetail?.categoryType} {">"}{" "}
            {bookDetail?.parentCategoryName
              ? bookDetail.parentCategoryName + ">"
              : ""}
            {bookDetail?.categoryName}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 40,
            height: 500,
          }}
        >
          <div
            style={{
              flex: 1,
              borderTop: "1px solid #ccc",
              borderBottom: "1px solid #ccc",
              padding: 10,
              textAlign: "center",

            }}
          >
            {bookDetail?.description}
          </div>

          <div style={{ flex: 1, border: "1px solid #ccc" }}>표지</div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div
              style={{
                borderTop: "1px solid #ccc",
                borderBottom: "1px solid #ccc",
                flex: 1,

                display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              }}
            >
              <p>{bookDetail?.authorName}</p>
              <p>
                {bookDetail?.publisherName} {bookDetail?.publishedDate}
              </p>
              <p>랭킹</p>
              <p>{bookDetail?.price}원</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div className="buttonInputContainer">
                <button onClick={onDecreaseQuantity} className="changQuantitybutton">-</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="quantityInput"
                />
                <button onClick={onIncreaseQuantity} className="changQuantitybutton">+</button>
              </div>
              <div>
                <AddCartItems isbn={bookDetail?.isbn!} quantity={quantity} resetQuantity={() => setQuantity(1)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default BookDetail;
