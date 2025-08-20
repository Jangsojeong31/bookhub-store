import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../layouts/Layout.module.css";

function Nav() {
  return (
    <div className={style.navigation}>
      <Link to="/login">
      <button>

      로그인/회원가입
      </button>
      </Link>
      <Link to="/mypage">
        <div
          style={{
            aspectRatio: "1/1",
            backgroundColor: "lemonchiffon",
            height: 45,
            borderRadius: "50%",
            textAlign: "center"
          }}
        >
          My
        </div>
      </Link>
      <Link to="/cart"><div
          style={{
            aspectRatio: "1/1",
            backgroundColor: "lemonchiffon",
            height: 45,
            borderRadius: "50%",
          }}
        >
          Cart
        </div></Link>
    </div>
  );
}

export default Nav;
