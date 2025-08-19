import React from 'react'
import type { CartItemsResponseDto } from '../../dtos/cart/CartItemsResponse.dto'
import { decreaseQuantity, increaseQuantity } from '../../apis/cart';
import { useCookies } from 'react-cookie';

interface ElementProps {
  cartItemList: CartItemsResponseDto[];
}

function CartItemListElement({cartItemList}: ElementProps) {
const [cookies] = useCookies(["accessToken"]);

  const onDecreseQuantity = async (id: number) => {
    const token = cookies.accessToken;

    await decreaseQuantity(id, token);
  }

  const onIncreaseQuantity = async (id: number) => {

    const token = cookies.accessToken;

    await increaseQuantity(id, token);
  }
  const cartItemListResult = cartItemList.map((item) => {
      return (
        <div style={{backgroundColor: "white", width: 800, height: 200, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 10px", margin: 10,gap: 12,
    }}>
      <div>체크박스</div>
      <div style={{border: "1px solid black", flex: 1, height: "90%"}}><p>표지</p></div>
      <div style={{flex: 2}}>
        <p>{item.title}</p>
        <p>{item.price}</p>
        </div>
        <div>
        <p>총 가격 : {item.totalPrice}</p>
        <button onClick={() => onDecreseQuantity(item.id)}>-</button>
        {item.quantity}
        <button onClick={() => onIncreaseQuantity(item.id)}>+</button>
        </div>
    </div>
      );
    });
  return (
    <>
    {cartItemListResult}
    </>
  )
}

export default CartItemListElement