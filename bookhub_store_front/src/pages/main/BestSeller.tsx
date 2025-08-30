import React, { useEffect, useState } from 'react'
import useToken from '../../hooks/useToken';
import { getBestSellerByCategory } from '../../apis/book';
import type { BestSellerDto } from '../../dtos/book/BestSeller.dto';

function BestSeller() {
   const token = useToken();
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
  }

  useEffect(() => {
    if (categoryType !== null) {
      fetchBestSeller();
    }
  }, [categoryType])

  const prevBook = () => {
    setCurrentIndex((prev) => (prev === 0 ? bestSeller.length - 1 : prev - 1));
  }

  const nextBook = () => {
    setCurrentIndex((prev) => (prev === bestSeller.length - 1 ? 0 : prev + 1));
  }

  const currentBook = bestSeller[currentIndex];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 style={{ marginRight: "auto", marginBottom: 50}}>이달의 베스트셀러</h2>
      <div style={{ display: "flex",}}>

      <div style={{ marginBottom: 10, display: "flex", flexDirection: "column" }}>
        <button onClick={() => setCategoryType(1)} style={{ background: "none", borderBottom: "1px solid pink", borderRadius: 0}}>국내도서</button>
        <button onClick={() => setCategoryType(2)} style={{ background: "none", borderBottom: "1px solid pink", borderRadius: 0}}>해외도서</button>
      </div>

      {currentBook && (
        <div style={{ display: "flex", alignItems: "center", gap: 20, border: "2px solid pink", padding: 20 }}>
          <button onClick={prevBook} style={{ fontSize: 24, background: "none", color: "pink" }}>◀</button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontWeight: 'bold', marginBottom: "auto" }}>{currentIndex + 1}위</span>
            <div style={{ border: "1px solid black", aspectRatio: "3.5/5", marginBottom: 5 , height: 400}}>
              <img src={currentBook.coverUrl} alt={currentBook.bookTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 400 }}>
              <div>{currentBook.bookTitle}</div>
              <div>{currentBook.authorName}</div>
              <div>{currentBook.publisherName}</div>
              <div>{currentBook.categoryName}</div>
              <div>판매량: {currentBook.totalSales}</div>
            </div>
          </div>
          
          <button onClick={nextBook} style={{ fontSize: 24, background: "none", color: "pink" }}>▶</button>
        </div>
      )}
      </div>
    </div>
  )
}

export default BestSeller