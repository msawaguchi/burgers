import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import Navbar from './components/Navbar'
import Header from './components/Header'
import FoodMenuCart from './components/FoodMenuCart'
import SearchInput from './components/SearchInput'

import { RootState } from './redux/store'

import styles from './App.module.css'

function useUpdateCSSVariables() {
  const restaurant = useSelector((state: RootState) => state.restaurant.data)

  const webSettings = restaurant ? restaurant?.webSettings : null

  useEffect(() => {
    if (webSettings) {
      document.documentElement.style.setProperty(
        '--background-colour',
        webSettings.backgroundColour,
      )
      document.documentElement.style.setProperty(
        '--primary-colour',
        webSettings.primaryColour,
      )
      document.documentElement.style.setProperty(
        '--primary-colour-hover',
        webSettings.primaryColourHover,
      )
      document.documentElement.style.setProperty(
        '--nav-background-colour',
        webSettings.navBackgroundColour,
      )
    }
  }, [webSettings])
}

function App() {
  useUpdateCSSVariables()
  return (
    <>
      <Navbar />
      <Header />
      <main className={styles.main}>
        <SearchInput />
        <FoodMenuCart />
      </main>
    </>
  )
}

export default App
