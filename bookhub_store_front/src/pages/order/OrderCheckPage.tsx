import React from "react";
import Layout from "../../components/layouts/Layout";
import TitleBar from "../../components/TitleBar";
import StickyCartOverview from "../../components/StickyCartOverview";
import { CiDeliveryTruck } from "react-icons/ci";
import DeliveryAddressInfo from "../address/DeliveryAddressInfo";
import OrderingItemList from "./OrderingItemList";
import SelectPayment from "../payment/SelectPayment";
import { useLocation } from "react-router-dom";

function OrderCheckPage() {
  const location = useLocation();
  const { totalPrice, discount, finalPrice, selectedItems } = location.state || {};

  const handlePayment = () => {

  }

  return (
    
      <TitleBar title="주문 / 결제">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
            padding: "30px 30px",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              padding: "30px 30px",
              gap: 20,
            }}
          >
            <DeliveryAddressInfo />
            <OrderingItemList selectedItems={selectedItems}/>
            <SelectPayment />
          </div>

          <StickyCartOverview
          totalPrice={totalPrice}
            discount={discount}
            finalPrice={finalPrice}
            button={
              <button
                disabled={selectedItems.length === 0}
                onClick={handlePayment}
              >
                결제하기
              </button>
            } />
        </div>
      </TitleBar>
    
  );
}

export default OrderCheckPage;
