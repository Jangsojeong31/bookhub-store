import React, { useEffect, useState } from "react";
import {
  loadTossPayments,
  type TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { customAlphabet, nanoid } from "nanoid";
import "./Checkout.css";
import { createOrder } from "../../apis/order";
import useToken from "../../hooks/useToken";
import type { CartItemsResponseDto } from "../../dtos/cart/CartItemsResponse.dto";
import type { OrderItems } from "../../dtos/order/request/CreateOrderRequest.dto";
import RequestPayment from "../order/RequestPayment";

function Checkout(props: {
  orderingItems: CartItemsResponseDto[];
  totalAmount: number;
  addressId: number;
}) {
  const orderingItems = props.orderingItems;
  const totalAmount = props.totalAmount;
  const addressId = props.addressId;

  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  
  const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      const tosspayments = await loadTossPayments(clientKey);

      const customerKey = nanoid(15);
      const widgets = tosspayments.widgets({ customerKey });
      setWidgets(widgets);
    };

    fetchPaymentWidget();
  }, [clientKey]);

  useEffect(() => {
    const renderPaymentWidgets = async () => {
      if (widgets == null) {
        return;
      }

      // 결제금액 설정하기
      widgets.setAmount({
        currency: "KRW",
        value: totalAmount,
      });

      // 결제창 렌더링
      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),

        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    };

    renderPaymentWidgets();
  }, [widgets]);

  return (
    <div>
      <div className="wrapper w-100">
        {/* <div className="max-w-540 w-100"> */}
          <div id="payment-method" className="w-100" />
          <div id="agreement" className="w-100" />
          <div className="btn-wrapper w-100">
            <RequestPayment
              totalAmount={totalAmount}
              address="당리푸르지오"
              orderingItems={orderingItems}
              addressId={addressId}
              widgets={widgets !== null ? widgets : null}
            />
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default Checkout;
