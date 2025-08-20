import React from "react";

function ProfileCardFrame(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 500,
        height: 600,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "30px",
        padding: "20px 20px",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      {props.children}
    </div>
  );
}

export default ProfileCardFrame;
