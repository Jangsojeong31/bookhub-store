import React from "react";
import style from "../layouts/Layout.module.css";
import Logo from "../header/Logo";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import logo from "../../assets/images/bh_store_logo_gray.png";

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.contents}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <img
            src={logo}
            alt="북허브_로고"
            style={{ height: "80px", cursor: "pointer", color: "rgb(131, 131, 131)" }}
          />
          <span>북허브의 도서 구매 사이트입니다.</span>
        </div>

        <p>
          <span>
            <strong>GitHub </strong>
            <a href="https://github.com/Jangsojeong31/bookhub-store" target="_blank">
              <FaGithub size={18} />
            </a>
          </span>
          <br />
          <span>
            <strong>Email</strong> susanjjang0301@gmail.com
          </span>
          <br />
          <span>© 2025 장소정. All rights reserved.</span>
          <br />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
