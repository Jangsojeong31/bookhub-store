import React from "react";
import styles from "./ProfileCard.module.css";
function ProfileCardFrame(props: { children: React.ReactNode }) {
  return <div className={styles.profileCardFrame}>{props.children}</div>;
}

export default ProfileCardFrame;
