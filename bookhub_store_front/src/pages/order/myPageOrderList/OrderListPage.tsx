import React, { useEffect, useState } from "react";
import Layout from "../../../components/layouts/Layout";
import TitleBar from "../../../components/TitleBar";
import OrderList from "./OrderList";
import useToken from "../../../hooks/useToken";
import type { OrderListResponseDto } from "../../../dtos/order/OrderListResponse.dto";
import { getMyOrders } from "../../../apis/order";

function OrderListPage() {
  const [orderList, setOrderList] = useState<OrderListResponseDto[]>([]);
  const token = useToken();

  const fetchOrderList = async () => {
    const res = await getMyOrders(token);

    const { code, message, data } = res;

    if (code == "SU" && data) {
      setOrderList(data);
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  return (
    <TitleBar title="주문 내역">
      <OrderList orderList={orderList} />
    </TitleBar>
  );
}

export default OrderListPage;
