import React from "react";
import type { AddressListResponseDto } from "../../dtos/address/AddressListResponse.dto";
import styles from "../order/orderCheck/OrderCheckPage.module.css";

interface Props {
  address: AddressListResponseDto | null;
  onOpenAddressList: () => void;
}

function DeliveryAddressInfo({ address, onOpenAddressList }: Props) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 15,
        display: "flex",
        alignItems: "center",
      }}
    >
      <h3 style={{ margin: 20 }}>배송지 정보</h3>
      {address ? (
        <div
          style={{
            margin: 10,
          }}
        >
          <p>
            <strong>{address.recipientName}</strong>
          </p>
          <span style={{ marginRight: "10px" }}>[{address.postalCode}]</span>
          <span style={{marginRight: 5}}>
            {address.fullAddress} 
          </span>
          <span>
            {address.detailAddress}
          </span>
          <p>{address.phoneNumber}</p>
        </div>
      ) : (
        <p style={{ color: "#818181ff" }}>배송지를 선택해주세요</p>
      )}

      <div style={{ marginLeft: "auto", marginRight: 20 }}>
        <button
          onClick={onOpenAddressList}
          className={styles.selectAddressButton}
        >
          배송지 선택
        </button>
      </div>
    </div>
  );
}

export default DeliveryAddressInfo;
