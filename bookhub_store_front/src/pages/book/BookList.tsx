import React, { useState } from 'react'

interface BookListProps {
  query: string;
}

function BookList({query}: BookListProps) {

  const [bookList, setBookList] = useState();
  
  const fetchBookList = async () => {

  }

  return (
    <div>BookList</div>
  )
}

export default BookList