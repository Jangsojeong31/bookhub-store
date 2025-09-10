// import React from 'react'
// import { useAuthStore } from '../stores/useAuthStore'
// import { Navigate, Outlet } from 'react-router-dom';

// function PrivateRoute() {
//   const { isLoggedIn } = useAuthStore();

//   if (isLoggedIn) {
//     return <Outlet />;
//   } else {
//     alert("로그인이 필요합니다.");
//     return <Navigate to="/login" />;
//   }
// }

// export default PrivateRoute