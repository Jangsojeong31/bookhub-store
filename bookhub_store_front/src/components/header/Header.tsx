import React from 'react'
import Logo from './Logo'
import Nav from './Nav'
import Search from './Search'
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
      <Logo />
      <Search />
      <Nav />
      </div>
    </header>
  )
}

export default Header