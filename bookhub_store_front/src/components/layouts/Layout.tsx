import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "./Layout.module.css";

function Layout(props: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />

      <main>
        <div className={styles.container}>{props.children}</div>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
