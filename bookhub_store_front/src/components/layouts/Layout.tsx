import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "./Layout.module.css";

function Layout(props: { children: React.ReactNode }) {
  return (
    <div>
      <Header />

      <main className={styles.main}>{props.children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
