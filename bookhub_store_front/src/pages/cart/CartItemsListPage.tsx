import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import { getCartItems } from "../../apis/cart";
import type { CartItemsResponseDto } from "../../dtos/cart/CartItemsResponse.dto";
import CartItemListElement from "./CartItemListElement";
import useToken from "../../hooks/useToken";
import TitleBar from "../../components/TitleBar";
import StickyCartOverview from "../../components/StickyCartOverview";
import { useNavigate } from "react-router-dom";

function CartItemsListPage() {
  const token = useToken();
  const navigation = useNavigate();
  const [selectedItems, setSelectedItems] = useState<CartItemsResponseDto[]>(
    []
  );
  const [cartItemList, setCartItemList] = useState<CartItemsResponseDto[]>([]);

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );
  const discount = 0;
  const finalPrice = totalPrice - discount;

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItemList.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...cartItemList]);
    }
  };

  const handleOrderPageNavi = () => {
    navigation("/order-check", {
      state: {
        totalPrice,
        discount,
        finalPrice,
        selectedItems,
      },
    });
  };
  const fetchCartList = async () => {
    const res = await getCartItems(token);

    const { code, message, data } = res;

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
  };

  useEffect(() => {
    fetchCartList();
  }, []);

  return (
    
      <TitleBar title="장바구니">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
            padding: "30px 30px",
            gap: 20,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                width: 1100,
                padding: "10px 10px",
                margin: 10,
                gap: 12,
              }}
            >
              <input
                type="checkbox"
                checked={selectedItems.length === cartItemList.length}
                onChange={toggleSelectAll}
              />
              <div>전체 선택</div>
            </div>
            <CartItemListElement
              cartItemList={cartItemList}
              onSelectionChange={setSelectedItems}
              selectedItems={selectedItems}
            />
          </div>
          <StickyCartOverview
            totalPrice={totalPrice}
            discount={discount}
            finalPrice={finalPrice}
            button={
              <button
                disabled={selectedItems.length === 0}
                onClick={handleOrderPageNavi}
              >
                주문하기
              </button>
            }
          />
        </div>
      </TitleBar>
  );
}

export default CartItemsListPage;
