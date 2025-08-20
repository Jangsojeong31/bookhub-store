import React from 'react'
import Logo from './Logo'
import Nav from './Nav'
import Search from './Search'
import styles from '../layouts/Layout.module.css'

function Header() {
  return (
    <header>
      <div className={styles.contents}>
      <Logo />
      <Search />
      <Nav />
      </div>
    </header>
  )
}

export default Header