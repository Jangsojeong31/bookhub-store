import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GetMyInfo from "../myPage/MyPage";
import Layout from "../../components/layouts/Layout";
import BestSeller from "./BestSeller";
import { useAuthStore } from "../../stores/useAuthStore";
import NewRelease from "./NewRelease";

function Main() {
  return (
    <div>
      <div>
        <NewRelease />
      </div>
      <div>
        <BestSeller />
      </div>
    </div>
  );
}

export default Main;
