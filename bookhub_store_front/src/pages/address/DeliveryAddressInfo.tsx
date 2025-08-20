import React from 'react'

function DeliveryAddressInfo() {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 15, display: "flex", alignItems: "center" }}>
      <h3 style={{margin: 20}}>배송지 정보</h3>
      <input type="text" placeholder='배송지 입력' />
    </div>
  )
}

export default DeliveryAddressInfo