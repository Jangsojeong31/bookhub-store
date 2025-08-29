import React from "react";
import Logo from "../../components/header/Logo";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signUp } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

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
      style={{ display: "flex", flexDirection: "column", gap: 20, width: 500 }}
    >
      <div style={{ margin: "0 auto", height: 200 }}>
        <Logo />
      </div>
      <h2>일반 회원가입</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <input
          {...register("email", { required: "이메일은 필수입니다." })}
          type="email"
          placeholder="이메일"
        />
        {errors.email && (
          <span style={{ color: "red" }}>{errors.email.message}</span>
        )}

        <input
          {...register("password", {
            required: "비밀번호는 필수입니다.",
            minLength: { value: 6, message: "6자리 이상 입력" },
          })}
          type="password"
          placeholder="비밀번호"
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password.message}</span>
        )}

        <input
          {...register("name", { required: "이름은 필수입니다." })}
          type="text"
          placeholder="이름"
        />
        {errors.name && (
          <span style={{ color: "red" }}>{errors.name.message}</span>
        )}

        <input
          {...register("phone", { required: "전화번호는 필수입니다." })}
          type="tel"
          placeholder="전화번호"
        />
        {errors.phone && (
          <span style={{ color: "red" }}>{errors.phone.message}</span>
        )}
      </div>
      <button>회원가입</button>
    </form>
  );
}

export default SignUp;
