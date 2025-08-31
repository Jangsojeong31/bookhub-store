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
            setSelectedAddress(address);
            setShowAddressList(false);
          }}
        />
      )}
    </div>
  );
}

export default DeliveryAddressContainer;
