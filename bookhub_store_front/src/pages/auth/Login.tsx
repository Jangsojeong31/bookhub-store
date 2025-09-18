import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../../components/header/Logo";
import SnsLogin from "./SnsLogin";
import { login } from "../../apis/auth";
import { useCookies } from "react-cookie";
import { useAuthStore } from "../../stores/useAuthStore";
import logo from "../../assets/images/bh_store_logo_4.png";
import "./Login.css";
import { useUserStore } from "../../stores/useUserStore";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [, setCookie] = useCookies(["accessToken", "tokenExpiresAt"]);
  const navigate = useNavigate();
  const { login: setLogin } = useAuthStore();
  const { setUser } = useUserStore();

  const handleNaviSignUp = () => {
    navigate("/sign-up");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await login(formData);

    const { code, message, data } = res;

    if (code == "SU" && data) {
      const token = data.token;
      const exprTime = data.exprTime;
      const user = data.user;

      setLogin(token, exprTime);
      setUser(user);

      const exprDate = new Date(Date.now() + Number(exprTime));

      setCookie("accessToken", token, {
        path: "/",
        expires: exprDate,
        sameSite: "strict",
      });

      setCookie("tokenExpiresAt", exprDate.toISOString(), {
        path: "/",
        sameSite: "strict",
      });

      alert("로그인 성공");
      navigate("/");
    } else {
      alert("로그인 실패");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <div style={{ margin: "0 auto", height: 200 }}>
      <Link to="/">
        <img
          src={logo}
          alt="북허브_로고"
          style={{ height: "100%", cursor: "pointer" }}
        />
      </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          name="email"
          value={formData.email}
          placeholder="이메일"
          onChange={handleChange}
          className="LoginInputEmail"
        />
        <input
          type="text"
          name="password"
          value={formData.password}
          placeholder="비밀번호"
          onChange={handleChange}
          className="LoginInputPassword"
        />
      </div>
      <button type="submit" className="LoginButton">로그인</button>

      <SnsLogin />

      <button onClick={handleNaviSignUp} className="LoginButton">회원가입</button>
    </form>
  );
}

export default Login;
