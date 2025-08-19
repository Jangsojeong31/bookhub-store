import React from "react";
import { useCookies } from "react-cookie";
import { addCartItems } from "../../apis/cart";

interface AddCartItemsProps {
  isbn: string;
  quantity? : number;
}
function AddCartItems({ isbn, quantity }: AddCartItemsProps) {
  const [cookies] = useCookies(["accessToken"]);

  const onAddCartItems = async () => {
    const token = cookies.accessToken;
    const dto = [{isbn: isbn, quantity: quantity ?? 1}];
    const res = await addCartItems(dto, token);
    const { code, message} = res;

    if (code != "success") {
      return;
    } else {
      alert("장바구니 담기 성공!");
    }
  };

  return (
    <div>
      <button onClick={onAddCartItems}>장바구니 담기</button>
    </div>
  );
}

export default AddCartItems;
