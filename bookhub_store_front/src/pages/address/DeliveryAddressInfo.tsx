import React from "react";
import type { AddressListResponseDto } from "../../dtos/address/AddressListResponse.dto";

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
        <div>
          <p>{address.recipientName}</p>
          <p>{address.phoneNumber}</p>
          <p>{address.postalCode}</p>
          <p>
            {address.fullAddress}
            {address.detailAddress}
          </p>
        </div>
      ) : (
        "배송지 선택"
      )}

      <div style={{ marginLeft: "auto", marginRight: 10 }}>
        <button onClick={onOpenAddressList}>배송지 선택</button>
      </div>
    </div>
  );
}

export default DeliveryAddressInfo;
