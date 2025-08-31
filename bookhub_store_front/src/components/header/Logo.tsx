import React from "react";
import logo from "../../assets/images/북허브_로고_배경제거2.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div style={{ height: 150, width: 300 }}>
      <Link to="/">
        <img
          src={logo}
          alt="북허브_로고"
          style={{ height: "100%", cursor: "pointer" }}
        />
      </Link>
    </div>
  );
}

export default Logo;
