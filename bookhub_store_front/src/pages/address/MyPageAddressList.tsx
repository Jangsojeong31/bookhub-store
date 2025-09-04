import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllAddresses } from "../../apis/address";
import type { AddressListResponseDto } from "../../dtos/address/AddressListResponse.dto";
import useToken from "../../hooks/useToken";
import DeleteAddress from "./DeleteAddress";
import TitleBar from "../../components/TitleBar";
import ProfileCardFrame from "../../components/ProfileCard/ProfileCardFrame";

function MyPageAddressList() {
  const token = useToken();
  const [addresses, setAddresses] = useState<AddressListResponseDto[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );

  const fetchAddresses = async () => {
    const res = await getAllAddresses(token);

    const { code, message, data } = res;

    if (code == "SU" && data) {
      setAddresses(data);
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const addressList = addresses.map((a: AddressListResponseDto) => {
    return (
      <div
        key={a.id}
        style={{
          backgroundColor: "#dbf0a31e",
          borderRadius: 5,
          marginBottom: 10,
          padding: 20,
          height: "100%",
          width: 500,

          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>
            <strong>{a.recipientName}</strong>
          </p>
          <DeleteAddress addressId={a.id} onDelete={() => fetchAddresses()} />
        </div>
        <span>
          [{a.postalCode}] {a.fullAddress} {a.detailAddress}
        </span>
        <p>{a.phoneNumber}</p>
        {/* <p>{a.defaultAddress == true ? "기본 배송지" : ""}</p> */}
      </div>
    );
  });

  return (
      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <div
          style={{
            marginRight: "auto",
            borderRadius: 5,
            padding: "10px 15px",
            border: "1px solid #DCF073",
            
          }}
        >
          <Link to="/address-form" style={{ color: "black", }}>
            배송지 추가
          </Link>
        </div>
        <div>{addressList}</div>
      </div>
  );
}

export default MyPageAddressList;
