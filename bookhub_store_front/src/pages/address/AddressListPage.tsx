import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { getAllAddresses } from "../../apis/address";
import type { AddressListResponseDto } from "../../dtos/address/AddressListResponse.dto";

interface Props {
  onSelect: (address: AddressListResponseDto) => void;
}

function AddressListPage({ onSelect }: Props) {
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
        <input
          type="radio"
          name="selectedAddress"
          value={a.id}
          checked={selectedAddressId === a.id}
          onChange={() => setSelectedAddressId(a.id)}
        />
        <p>{a.recipientName}</p>
        <span>{a.fullAddress}</span>
        <span>{a.detailAddress}</span>
        <p>{a.phoneNumber}</p>
        <p>{a.defaultAddress == true ? "기본 배송지" : ""}</p>
      </div>
    );
  });

  const handleSelect = () => {
    const selected = addresses.find((a) => a.id === selectedAddressId);
    if (selected) onSelect(selected);
    else alert("배송지를 선택해주세요");
  };

  return (
    <div>
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
        <button onClick={handleSelect}>선택 완료</button>
      </div>
    </div>
  );
}

export default AddressListPage;
