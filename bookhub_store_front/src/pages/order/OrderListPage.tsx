import React from "react";
import Layout from "../../components/layouts/Layout";
import TitleBar from "../../components/TitleBar";
import OrderList from "./OrderList";

function OrderListPage() {
  return (
    
      <TitleBar title="주문 내역">
        <OrderList />
      </TitleBar>
    
  );
}

export default OrderListPage;
