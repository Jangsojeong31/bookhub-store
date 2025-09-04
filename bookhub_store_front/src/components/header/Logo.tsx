import React from "react";
import logo from "../../assets/images/bh_store_logo_4.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div style={{ height: 130, width: 300, padding: 0 }}>
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
