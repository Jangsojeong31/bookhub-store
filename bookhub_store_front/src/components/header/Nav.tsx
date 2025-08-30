import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../layouts/Layout.module.css";
import { useAuthStore } from "../../stores/useAuthStore";
import AuthButton from "./AuthButton";

function Nav() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className={style.navigation}>
      <p>{user?.nickname ?? "user"}님</p>
      <Link to="/mypage">
        <div
          style={{
            aspectRatio: "1/1",
            backgroundColor: "lemonchiffon",
            height: 45,
            borderRadius: "50%",
            textAlign: "center",
          }}
        >
          My
        </div>
      </Link>
      <Link to="/cart">
        <div
          style={{
            aspectRatio: "1/1",
            backgroundColor: "lemonchiffon",
            height: 45,
            borderRadius: "50%",
          }}
        >
          Cart
        </div>
      </Link>
      <AuthButton />
    </div>
  );
}

export default Nav;
