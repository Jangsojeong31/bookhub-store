import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import BookList from "./BookList";
import { useLocation } from "react-router-dom";

function BookListPage() {
  const [query, setQuery] = useState("");

const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get("query") || "");
  }, [location.search])

  return (
    <Layout>
      <div
        style={{
          backgroundColor: "#eee",
          width: 1000,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "90%",
            height: "90%",
            backgroundColor: "lightblue",
            padding: "20px 20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>'{query}'에 대한 검색 결과 : ''건</div>
            <div>선택한거 장바구니 담기</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>검색 조건</div>
            <div><BookList query={query} /></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BookListPage;
