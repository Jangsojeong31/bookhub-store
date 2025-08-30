import React from 'react'
import { useSearchParams } from 'react-router-dom';

function ExistingEmail() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const provider = searchParams.get("provider");

  return (
    <div>
      <h3>{email}은 이미 가입된 이메일입니다. {provider}로 로그인 해주세요.</h3>
    </div>
  )
}

export default ExistingEmail