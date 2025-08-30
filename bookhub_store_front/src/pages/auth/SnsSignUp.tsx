import React, { useEffect } from "react";
import Logo from "../../components/header/Logo";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signUp, snsSignUp } from "../../apis/auth";
import { getUserInfoById } from "../../apis/customer";
import { useCookies } from "react-cookie";
import { useAuthStore } from "../../stores/useAuthStore";

interface SnsSignUpFormInputs {
  email: string;
  name: string;
  phone: string;
}

function SnsSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SnsSignUpFormInputs>();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const [, setCookie] = useCookies(["accessToken", "tokenExpiresAt"]);
  const { login: setLogin } = useAuthStore();

  const fetchUserInfo = async () => {
    const res = await getUserInfoById(Number(userId));

    const { code, message, data } = res;

    if (code == "SU" && data) {
      console.log(data.email);
      reset({
        email: data.email || "",
        name: data.name || "",
        phone: data.phoneNumber || "",
      });
    } else {
      console.error("사용자 정보를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const onSubmit: SubmitHandler<SnsSignUpFormInputs> = async (data) => {
    console.log("회원가입 정보: ", data);

    const {
      code,
      message,
      data: result,
    } = await snsSignUp(Number(userId), data);

    if (code == "SU" && result) {
      const token = result.token;
      const exprTime = result.exprTime;
      const user = result.user;

      setLogin(token, exprTime, user);

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
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: 20, width: 500 }}
    >
      <div style={{ margin: "0 auto", height: 200 }}>
        <Logo />
      </div>
      <h2>소셜 회원가입</h2>
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

export default SnsSignUp;
