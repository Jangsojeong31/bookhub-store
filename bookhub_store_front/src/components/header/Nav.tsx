import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from './Header.module.css'

function Nav() {
  return (
    <div className={style.navigation}>
      <Link to="/mypage">마이</Link>
      <Link to="/login">로그인/회원가입</Link>
      <Link to="/cart">장바구니</Link>
    </div>
  )
}

export default Nav