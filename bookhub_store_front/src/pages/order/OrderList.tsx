import React, { useEffect, useState } from 'react'
import useToken from '../../hooks/useToken';

function OrderList() {
  const [orderList, setOrderList] = useState([]);
  const token = useToken();

  const fetchOrderList = async() => {

  }

  useEffect(() => {
    fetchOrderList();
  }, [])

  const orderListResult = orderList;

  return (
    <div>{orderListResult}</div>
  )
}

export default OrderList