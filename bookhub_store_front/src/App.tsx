import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Main from './pages/main/Main'
import SnsLoginSuccess from './pages/auth/SnsLoginSuccess'
import MyPage from './pages/myPage/MyPage'
import UpdateNickname from './pages/myPage/UpdateNickname'
import UpdateProfileImage from './pages/myPage/UpdateProfileImage'
import UpdateMyInfo from './pages/myPage/UpdateMyInfo'
import BookListPage from './pages/book/BookListPage'
import CartItemsListPage from './pages/cart/CartItemsListPage'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/main" />} />
        <Route path='/main' element={<Main />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/login/success' element={<SnsLoginSuccess />} />

        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypage/info' element={<UpdateMyInfo />} />
        <Route path='/mypage/nickname' element={<UpdateNickname />} />
        <Route path='/mypage/profile-image' element={<UpdateProfileImage />} />

        <Route path='/search-books' element={<BookListPage />} />

        <Route path='/cart' element={<CartItemsListPage />} />
      </Routes>
    </>
  )
}

export default App
