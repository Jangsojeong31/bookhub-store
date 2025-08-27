import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllAddresses } from "../../apis/address";
import type { AddressListResponseDto } from "../../dtos/address/AddressListResponse.dto";
import useToken from "../../hooks/useToken";

function MyPageAddressList() {
  const token = useToken();
  const [addresses, setAddresses] = useState<AddressListResponseDto[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      const res = await getAllAddresses(token);

      const { code, message, data } = res;

      if (code == "SU" && data) {
        setAddresses(data);
      } else {
        return;
      }
    };

    fetchAddresses();
  }, []);

  const addressList = addresses.map((a: AddressListResponseDto) => {
    return (
      <div
        key={a.id}
        style={{
          border: "1px solid black",
          borderRadius: 5,
          padding: 15,
          margin: 10,
          width: 500,
        }}
      >
        <p>{a.recipientName}</p>
        <span>{a.fullAddress}</span>
        <span>{a.detailAddress}</span>
        <p>{a.phoneNumber}</p>
        <p>{a.defaultAddress == true ? "기본 배송지" : ""}</p>
        <input 
        type="radio"

        />
      </div>
    );
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      <div
        style={{
          marginLeft: "auto",
          backgroundColor: "aquamarine",
          borderRadius: 5,
          padding: 10,
        }}
      >
        <Link to="/address-form">배송지 추가</Link>
      </div>
      <div>{addressList}</div>
    </div>
  );
}

export default MyPageAddressList;
