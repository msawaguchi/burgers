import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import styles from './header.module.css'

function Header() {
  const restaurant = useSelector((state: RootState) => state.restaurant.data)
  const webSettings = restaurant?.webSettings || null

  return (
    <header>
      <div className={styles.logo_container}>
        <img
          src={webSettings ? webSettings.bannerImage : undefined}
          alt="qsburgers"
        />
      </div>
    </header>
  )
}

export default Header
