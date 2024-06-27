import { useState } from 'react'

import styles from './navbar.module.css'
import menuIcon from '../../assets/icon_hamburguer.png'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <nav className={styles.navbar}>
      <strong className={styles.navbarMobileHeader}>Menu</strong>
      <ul className={`${styles.navbarList} ${isMenuOpen ? styles.open : ''}`}>
        <li className={styles.active}>
          <a href="#">menu</a>
        </li>
        <li>
          <a href="#">entrar</a>
        </li>
        <li>
          <a href="#">contato</a>
        </li>
      </ul>
      <button className={styles.mobileNavbar} onClick={handleMenuToggle}>
        <img src={menuIcon} alt="" />
      </button>
    </nav>
  )
}

export default Navbar
