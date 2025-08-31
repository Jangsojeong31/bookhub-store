import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import TitleBar from "../../components/TitleBar";
import StickyCartOverview from "../../components/StickyCartOverview";
import { CiDeliveryTruck } from "react-icons/ci";
import DeliveryAddressInfo from "../address/DeliveryAddressContainer";
import OrderingItemList from "./OrderingItemList";
import SelectPayment from "../payment/SelectPayment";
import { useLocation } from "react-router-dom";
import DeliveryAddressContainer from "../address/DeliveryAddressContainer";
import type { AddressListResponseDto } from "../../dtos/address/AddressListResponse.dto";
import styles from "./OrderCheckPage.module.css";

function OrderCheckPage() {
  const location = useLocation();
  const { totalPrice, discount, finalPrice, selectedItems } =
    location.state || {};
  const [addressId, setAddressId] = useState<number | null>(null);

  const handlePayment = () => {};

  const handleAddressChange = (address: AddressListResponseDto | null) => {
    setAddressId(address?.id!);
  };

  return (
    <TitleBar title="주문 / 결제">
      <div className={styles.orderCheckContainer}>
        <div className={styles.orderCheckContent}>
          <DeliveryAddressContainer onAddressChange={handleAddressChange} />
          <OrderingItemList selectedItems={selectedItems} />
          <SelectPayment
            selectedItems={selectedItems}
            finalPrice={finalPrice}
            addressId={addressId ?? 0}
          />
        </div>

        <StickyCartOverview
          totalPrice={totalPrice}
          discount={discount}
          finalPrice={finalPrice}
          button={
            <button
              disabled={selectedItems.length === 0}
              onClick={handlePayment}
              className={styles.orderButton}
            >
              결제하기
            </button>
          }
        />
      </div>
    </TitleBar>
  );
}

export default OrderCheckPage;
