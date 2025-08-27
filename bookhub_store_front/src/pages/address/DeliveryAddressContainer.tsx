import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeliveryAddressInfo from "./DeliveryAddressInfo";
import AddressListPage from "./AddressListPage";
import type { AddressListResponseDto } from "../../dtos/address/AddressListResponse.dto";

interface DeliveryAddressContainerProps {
  onAddressChange?: (address: AddressListResponseDto | null) => void;
}

function DeliveryAddressContainer({
  onAddressChange,
}: DeliveryAddressContainerProps) {
  const [selectedAddress, setSelectedAddress] =
    useState<AddressListResponseDto | null>(null);
  const [showAddressList, setShowAddressList] = useState(false);

  useEffect(() => {
    if (onAddressChange) {
      onAddressChange(selectedAddress);
    }
  }, [selectedAddress, onAddressChange]);

  return (
    <div>
      <DeliveryAddressInfo
        address={selectedAddress}
        onOpenAddressList={() => setShowAddressList(true)}
      />

      {showAddressList && (
        <AddressListPage
          onSelect={(address) => {
            setSelectedAddress(address); // 부모 상태 업데이트
            setShowAddressList(false); // 선택 후 리스트 닫기
          }}
        />
      )}
    </div>
  );
}

export default DeliveryAddressContainer;
