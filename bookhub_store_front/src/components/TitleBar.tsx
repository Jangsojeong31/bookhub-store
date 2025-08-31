import React from 'react'
import styles from "./TitleBar.module.css";

function TitleBar(props: { title: string, children: React.ReactNode }) {
  return (
    <div className={styles.titleBarContainer}>
      <div className={styles.titleBarTitle}>
        <h2>
        {props.title}
        </h2>
      </div>
      <div className={styles.titleBarChildren}>
        {props.children}
      </div>
    </div>
  )
}

export default TitleBar