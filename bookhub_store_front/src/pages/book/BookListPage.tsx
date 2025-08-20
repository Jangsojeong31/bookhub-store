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
  }, [location.search]);

  return (
    <Layout>
      <div
        style={{
          width: "90%",
          minHeight: "calc(100vh - 300px)",
          backgroundColor: "lightblue",
          padding: "20px 20px",
          
          display: "flex",
          flexDirection: "column",
          gap: 20
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>'{query}'에 대한 검색 결과 : ''건</div>
          <button>장바구니 담기</button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{flex: 1, border: "1px solid black"}}>검색 조건</div>
          <div style={{flex: 4}}>
            <BookList query={query} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BookListPage;
