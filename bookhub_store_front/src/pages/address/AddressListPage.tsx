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
          backgroundColor: "#cccccc5b",
          borderRadius: 5,
          marginBottom: 10,
          padding: 10,

          display: "flex",
          gap: 20,
        }}
      >
        <input
          type="radio"
          name="selectedAddress"
          value={a.id}
          checked={selectedAddressId === a.id}
          onChange={() => setSelectedAddressId(a.id)}
        />
        <div>

        <p><strong>{a.recipientName}</strong></p>
        <span style={{ marginRight: "10px"}}>{a.postalCode}</span>
        <span>{a.fullAddress}</span>
        <span>{a.detailAddress}</span>
        <p>{a.phoneNumber}</p>
        </div>
        {/* <p>{a.defaultAddress == true ? "기본 배송지" : ""}</p> */}
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
      <div style={{ display: "flex", flexDirection: "column", gap: 15, padding: 30, width: 500, margin: "0px auto"}}>
        <div
          style={{
            marginRight: "auto",
            color: "#106641ce",
          }}
        >
          <Link to="/address-form" style={{ color: "#106641ce"}}>배송지 추가</Link>
        </div>

        <div>{addressList}</div>
        <button onClick={handleSelect}>선택 완료</button>
      </div>
    </div>
  );
}

export default AddressListPage;
