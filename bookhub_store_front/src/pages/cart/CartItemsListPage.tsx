import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts/Layout'
import { getCartItems } from '../../apis/cart'
import { useCookies } from 'react-cookie'
import type { CartItemsResponseDto } from '../../dtos/cart/CartItemsResponse.dto';
import CartItemListElement from './CartItemListElement';

function CartItemsListPage() {

  const [cookies] = useCookies(["accessToken"]);

  const [cartItemList, setCartItemList] = useState<CartItemsResponseDto[]>([]);

  const fetchCartList = async() => {
    const token = cookies.accessToken;

    const res = await getCartItems(token);

    const {code, message, data} = res;

    if (code != "success") {
      setCartItemList([]);
      return;
    }

    if (Array.isArray(data)) {
      setCartItemList(data);
    } else {
      setCartItemList([]);
      alert("장바구니가 비어있습니다.");
    }
  }

  useEffect(() => {
    fetchCartList();
  }, [])
  
  return (
    <Layout>
      <div>
        <CartItemListElement cartItemList={cartItemList} />
      </div>
    </Layout>
  )
}

export default CartItemsListPage