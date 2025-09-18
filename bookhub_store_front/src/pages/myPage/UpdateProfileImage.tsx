import React, { useEffect, useState } from "react";
import ProfileCardFrame from "../../components/ProfileCard/ProfileCardFrame";
import useToken from "../../hooks/useToken";
import {
  uploadProfileImage,
} from "../../apis/customer";
import defaultProfileImage from "../../assets/images/기본_프로필_이미지.png";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import styles from "./MyPage.module.css";
import { API_BASE } from "../../config/runtimeConfig";
import { useUserStore } from "../../stores/useUserStore";

function UpdateProfileImage() {
  const [profileImage, setProfileImage] = useState<string | null>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const token = useToken();
  const { user, setProfileImageUrl } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    setProfileImage(user?.profileImageUrl ?? null);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const onUpdateProfileImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadProfileImage(formData, token);
    const { code, message, data } = res;

    if (code !== "success" || !data?.profileImageUrl) {
      alert("이미지 업로드 실패");
      return;
    }

    const imageUrl = data.profileImageUrl;

    setProfileImage(imageUrl);
    setProfileImageUrl(imageUrl);
    setPreview(null);
    setFile(null);

    navigate(-1);
  };

  return (
    <ProfileCardFrame>
      <div className={styles.formContainer}>
        <h3>프로필 이미지 변경</h3>
        <div className={styles.profileImageContainer}>
          <img
            src={
              preview
                ? preview
                : profileImage && profileImage.startsWith("/files")
                ? `${API_BASE}${encodeURI(profileImage!)}`
                : profileImage
                ? profileImage
                : defaultProfileImage
            }
            alt="프로필 이미지"
          />
          <input type="file" accept="image/*" onChange={onFileChange} />
        </div>
        <button onClick={onUpdateProfileImage} disabled={!file}>
          저장
        </button>
      </div>
    </ProfileCardFrame>
  );
}

export default UpdateProfileImage;
