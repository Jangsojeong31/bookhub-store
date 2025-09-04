import React from "react";
import Logo from "../../components/header/Logo";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signUp } from "../../apis/auth";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import logo from "../../assets/images/bh_store_logo_4.png";

interface SignUpFormInputs {
  email: string;
  password: string;
  name: string;
  phone: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    console.log("회원가입 정보: ", data);

    const { code, message } = await signUp(data);

    if (code == "SU") {
      alert("회원가입 성공");
      navigate("/login");
    } else {
      alert("회원가입 실패");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
        width: 500,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 100,
          marginRight: "auto",
        }}
      >
        <div style={{ height: 100 }}>
          <Link to="/">
            <img
              src={logo}
              alt="북허브_로고"
              style={{ height: "100%", cursor: "pointer" }}
            />
          </Link>
        </div>
        <h3 style={{}}>회원가입</h3>
      </div>

      <div className="formContainer">
        <div className="formElement">
          <p>이메일</p>
          <input
            {...register("email", { required: "이메일은 필수입니다." })}
            type="email"
            placeholder="이메일"
          />
        </div>

        <div className="errorDiv">
          {errors.email && (
            <p className="errorMessage">{errors.email.message}</p>
          )}
        </div>

        <div className="formElement">
          <p>비밀번호</p>

          <input
            {...register("password", {
              required: "비밀번호는 필수입니다.",
              minLength: { value: 6, message: "6자리 이상 입력" },
            })}
            type="password"
            placeholder="비밀번호"
          />
        </div>

        <div className="errorDiv">
          {errors.password && (
            <p className="errorMessage">{errors.password.message}</p>
          )}
        </div>

        <div className="formElement">
          <p>이름</p>
          <input
            {...register("name", { required: "이름은 필수입니다." })}
            type="text"
            placeholder="이름"
          />
        </div>
        <div className="errorDiv">
          {errors.name && <p className="errorMessage">{errors.name.message}</p>}
        </div>

        <div className="formElement">
          <p>전화번호</p>
          <input
            {...register("phone", { required: "전화번호는 필수입니다." })}
            type="tel"
            placeholder="전화번호"
          />
        </div>
        <div className="errorDiv">
          {errors.phone && (
            <p className="errorMessage">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <button className="SignupButton">회원가입</button>
    </form>
  );
}

export default SignUp;
