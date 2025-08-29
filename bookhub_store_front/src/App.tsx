import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Main from "./pages/main/Main";
import SnsLoginSuccess from "./pages/auth/SnsLoginSuccess";
import MyPage from "./pages/myPage/MyPage";
import UpdateNickname from "./pages/myPage/UpdateNickname";
import UpdateProfileImage from "./pages/myPage/UpdateProfileImage";
import UpdateMyInfo from "./pages/myPage/UpdateMyInfo";
import BookListPage from "./pages/book/BookListPage";
import CartItemsListPage from "./pages/cart/CartItemsListPage";
import BookDetail from "./pages/book/BookDetail";
import OrderCheckPage from "./pages/order/OrderCheckPage";
import OrderListPage from "./pages/order/OrderListPage";
import Layout from "./components/layouts/Layout";
import Success from "./pages/payment/Success";
import OrderDetail from "./pages/order/OrderDetail";
import AddressForm from "./pages/address/AddressForm";
import AddressListPage from "./pages/address/AddressListPage";
import MyPageAddressList from "./pages/address/MyPageAddressList";
import SignUp from "./pages/auth/SignUp";
import SnsSignUp from "./pages/auth/SnsSignUp";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sns-sign-up" element={<SnsSignUp />} />
          <Route path="/login/success" element={<SnsLoginSuccess />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/info" element={<UpdateMyInfo />} />
          <Route path="/mypage/nickname" element={<UpdateNickname />} />
          <Route
            path="/mypage/profile-image"
            element={<UpdateProfileImage />}
          />

          <Route path="/search-books" element={<BookListPage />} />
          <Route path="/books/details" element={<BookDetail />} />

          <Route path="/cart" element={<CartItemsListPage />} />

          <Route path="/order-check" element={<OrderCheckPage />} />
          <Route path="/mypage/order-list" element={<OrderListPage />} />
          <Route path="/mypage/order-list/detail" element={<OrderDetail />} />

          <Route path="/payment/success" element={<Success />} />

          <Route path="/address-form" element={<AddressForm />} />
          <Route path="/mypage/address-list" element={<MyPageAddressList />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
