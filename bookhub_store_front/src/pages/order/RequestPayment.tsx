import { customAlphabet, nanoid } from "nanoid";
import React from "react";
import { createOrder } from "../../apis/order";
import type {
  CreateOrderRequestDto,
  OrderItems,
} from "../../dtos/order/request/CreateOrderRequest.dto";
import useToken from "../../hooks/useToken";
import type { CartItemsResponseDto } from "../../dtos/cart/CartItemsResponse.dto";
import type { TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";

interface props {
  totalAmount: number;
  address: string;
  orderingItems: CartItemsResponseDto[];
  widgets?: TossPaymentsWidgets | null;
}

function RequestPayment({
  totalAmount,
  address,
  orderingItems,
  widgets,
}: props) {
  const token = useToken();

  const nanoid = customAlphabet("0123456789", 6);
  const generateOrderNumber = () => {
    const now = new Date();
    const datePart = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;

    const randomPart = nanoid();

    return `${datePart}${randomPart}`;
  };

  const generateOrderName = (items: CartItemsResponseDto[]): string => {
    if (items.length == 0) return "주문";

    const firstBookTitle = items[0].title;
    if (items.length === 1) {
      return firstBookTitle;
    } else {
      return `${firstBookTitle} 외 ${items.length - 1}건`;
    }
  };

  const orderNumber = generateOrderNumber();
  const orderName = generateOrderName(orderingItems);

  const handlePayment = async () => {
    const orderingItemList: OrderItems[] = orderingItems.map((item) => ({
      isbn: item.isbn,
      bookPrice: item.price,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
    }));

    const dto: CreateOrderRequestDto = {
      orderNumber,
      orderName,
      totalAmount,
      address,
      items: orderingItemList,
    };

    // 주문 내역(요청중) 생성
    const res = await createOrder(dto, token);

    // 결제 요청
    try {
      await widgets?.requestPayment({
        orderId: orderNumber, // 주문번호
        orderName,

        customerName: "김토스",
        customerEmail: "customer123@gmail.com",

        successUrl:
          window.location.origin + "/payment/success" + window.location.search,
        failUrl:
          window.location.origin + "/payment/fail" + window.location.search,
      });
    } catch (error) {}
  };

  return (
    <div>
      <button className="btn primary w-100" onClick={handlePayment}>
        결제하기
      </button>
    </div>
  );
}

export default RequestPayment;
