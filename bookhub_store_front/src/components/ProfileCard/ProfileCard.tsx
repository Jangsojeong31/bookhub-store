import React from "react";
import ProfileImageSection from "./ProfileImageSection";
import ProfileActionButtons from "./ProfileActionButtons";
import ProfileMenuList from "./ProfileMenuList";
import ProfileCardFrame from "./ProfileCardFrame";

interface ProfileCardProps {
  nickname: string;
  profileImageUrl?: string | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  nickname,
  profileImageUrl,
}) => {
  return (
    <ProfileCardFrame>
      <ProfileImageSection
        nickname={nickname}
        profileImageUrl={profileImageUrl}
        />
      <ProfileActionButtons />
      <ProfileMenuList />
        </ProfileCardFrame>
  );
};

export default ProfileCard;
