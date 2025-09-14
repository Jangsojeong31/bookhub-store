import type { Address } from "cluster";
import React, { useState } from "react";
import "./AddressListPage";
import useToken from "../../hooks/useToken";
import { addDeliveryAddress } from "../../apis/address";
import type { CreateAddressRequestDto } from "../../dtos/address/CreateAddressRequest.dto";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    daum: any;
  }
}

interface AddressData {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
}

function AddressForm() {
  const [zonecode, setZonecode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const token = useToken();
  const navigation = useNavigate();

  const loadDaumPostcodeScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.getElementById("daum-postcode-script")) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.id = "daum-postcode-script";
      script.src =
        "http://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Daum postcode script load error"));
      document.body.appendChild(script);
    });
  };

  const handleDaumPostcode = async () => {
    await loadDaumPostcodeScript();
    new window.daum.Postcode({
      oncomplete: (data: AddressData) => {
        const fullAddr = data.roadAddress || data.jibunAddress;
        setZonecode(data.zonecode);
        setAddress(fullAddr);
      },
    }).open();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dto: CreateAddressRequestDto = {
      recipientName,
      phoneNumber,
      postalCode: zonecode,
      fullAddress: address,
      detailAddress,
    }

    await addDeliveryAddress(dto, token);

    navigation(-1);

  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-container">
        <label htmlFor="recipient">받는 분</label>
        <input
        id="recipient"
          type="text"
          placeholder="받는 분의 이름을 입력해주세요"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="input-container">
        <label htmlFor="phone">휴대폰 번호</label>
        <input
        id="phone"
          type="text"
          placeholder="휴대폰번호를 입력해주세요"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="form-input"
        />
      </div>
<div className="postcode-container">
<label>배송지</label>
        <div className="postcode-input-container">

        <input type="text" placeholder="우편번호" value={zonecode} readOnly className="postcode-input" />
        <button type="button" onClick={handleDaumPostcode} className="postcode-button">주소 찾기</button>
        </div>

      <div className="postcode-input-container ">
        <input type="text" placeholder="주소" value={address} readOnly className="postcode-input" />
      </div>

      <div className="postcode-input-container ">
        <input
          type="text"
          placeholder="상세 주소"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
          className="postcode-input"
          />
      </div>

      <button type="submit" className="submit-button">저장</button>
</div>
    </form>
  );
}

export default AddressForm;
