import React from "react";
import { useCookies } from "react-cookie";
import { addCartItems } from "../../apis/cart";
import "../book/BookList.css"

interface AddCartItemsProps {
  isbn: string;
  quantity? : number;
  resetQuantity: () => void;
}
function AddCartItems({ isbn, quantity, resetQuantity }: AddCartItemsProps) {
  const [cookies] = useCookies(["accessToken"]);

  const onAddCartItems = async () => {
    const token = cookies.accessToken;
    const dto = [{isbn: isbn, quantity: quantity ?? 1}];
    const res = await addCartItems(dto, token);
    const { code, message} = res;

    if (code == "SU") {
      alert("장바구니 담기 성공!");
      resetQuantity();
    } else {
      return;
    }
  };

  return (
    <div>
      <button onClick={onAddCartItems} className="addCartbutton">장바구니 담기</button>
    </div>
  );
}

export default AddCartItems;
