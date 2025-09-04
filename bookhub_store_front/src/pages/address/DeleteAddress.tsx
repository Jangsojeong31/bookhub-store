import React from 'react'
import useToken from '../../hooks/useToken';
import { deleteAddress } from '../../apis/address';

function DeleteAddress(props: {addressId: number, onDelete: () => void}) {
  const addressId = props.addressId;
  const onDelete = props.onDelete;
  const token = useToken();
  const onDeleteAddress = async () => {
    const res = await deleteAddress(addressId, token);

    const { code, message } = res;

    if (code == "SU") {
      alert("배송지가 삭제되었습니다.");
      onDelete();
    } else {
      alert("다시 시도해주세요.")
    }

  }

  return (
    <div><button onClick={onDeleteAddress} style={{ background: "none", }}>삭제</button></div>
  )
}

export default DeleteAddress