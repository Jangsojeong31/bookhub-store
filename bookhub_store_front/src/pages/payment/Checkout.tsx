import React, { useEffect, useState } from 'react'
import { loadTossPayments, type TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import { nanoid } from 'nanoid';
import "./Checkout.css";

function Checkout() {
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 1000,
  })

  const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

  useEffect(() => {
    const fetchPaymentWidget = async() => {
      const tosspayments = await loadTossPayments(clientKey);
    
      const customerKey = nanoid(15);
      const widgets = tosspayments.widgets({customerKey});
      setWidgets(widgets);
    }

    fetchPaymentWidget();
  }, [clientKey]);

  useEffect(() => {
    const renderPaymentWidgets = async() => {
      if (widgets == null) {
        return;
      }

      // 결제금액 설정하기
      widgets.setAmount(amount);

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
    }

    renderPaymentWidgets();
  }, [widgets]);

  
  return (
    <div>
      <div className="wrapper w-100">
      <div className="max-w-540 w-100">
        <div id="payment-method" className="w-100" />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
          <button
            className="btn primary w-100"
            onClick={async () => {
              try {
                await widgets?.requestPayment({
                  orderId: nanoid(),
                  orderName: "토스 티셔츠 외 2건",
                  customerName: "김토스",
                  customerEmail: "customer123@gmail.com",
                  successUrl: window.location.origin + "/payment/success" + window.location.search,
                  failUrl: window.location.origin + "/payment/fail" + window.location.search
                });
              } catch (error) {
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Checkout