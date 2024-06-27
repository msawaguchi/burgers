import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '../Menu'
import Cart from '../Cart'

import { fetchRestaurantInfo } from '../../redux/restaurantSlice'
import { fetchMenuInfo } from '../../redux/menuSlice'
import { RootState, AppDispatch } from '../../redux/store'

import styles from './menucart.module.css'

function FoodMenuCart() {
  const dispatch = useDispatch<AppDispatch>()
  const restaurantStatus = useSelector(
    (state: RootState) => state.restaurant.status,
  )
  const cart = useSelector((state: RootState) => state.cart)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchRestaurantInfo())
    dispatch(fetchMenuInfo())
  }, [dispatch])

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  if (restaurantStatus === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <section className={styles.menu_cart_container}>
      <Menu>
        {cart.items.length > 0 && (
          <div className={styles.cartButtonContainer}>
            <button
              className={styles.buttonViewBasket}
              onClick={handleToggleCart}
            >
              Your basket • {cart.items.length} items
            </button>
          </div>
        )}
      </Menu>
      <Cart isOpen={isCartOpen} toggleCart={handleToggleCart} />
    </section>
  )
}

export default FoodMenuCart
