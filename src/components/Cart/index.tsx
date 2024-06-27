import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../redux/store'
import { updateItemQuantity, removeItemFromCart } from '../../redux/cartSlice'
import { priceFormatter } from '../../utils/priceFormatter'

import styles from './cart.module.css'
import closeIcon from '../../assets/icon_close.png'

interface CartProps {
  isOpen: boolean
  toggleCart: () => void
}

function Cart({ isOpen, toggleCart }: CartProps) {
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.cart)

  const handleAddQuantity = (id: number) => {
    const item = cart.items.find((item) => item.id === id)
    if (item) {
      dispatch(updateItemQuantity({ id, quantity: item.quantity + 1 }))
    }
  }

  const handleSubQuantity = (id: number) => {
    const item = cart.items.find((item) => item.id === id)
    if (item && item.quantity > 1) {
      dispatch(updateItemQuantity({ id, quantity: item.quantity - 1 }))
    } else {
      dispatch(removeItemFromCart(id))
    }
  }

  return (
    <div className={`${styles.cart} ${isOpen ? styles.open : ''}`}>
      <div className={styles.cartHeader}>
        <span>Carrinho</span>
        {isOpen && (
          <img
            src={closeIcon}
            className={styles.closeCartButton}
            onClick={toggleCart}
            alt=""
          />
        )}
      </div>
      {cart.items.length === 0 ? (
        <div className={styles.emptyCart}>Seu carrinho está vazio</div>
      ) : (
        <>
          <div className={styles.cartList}>
            {cart.items.map((item) => (
              <div key={item.id} className={styles.cartListItem}>
                <div className={styles.cartListItemInfo}>
                  <span>{item.name}</span>
                  {item.description && <span>{item.description}</span>}
                  <div className={styles.cartCounter}>
                    <button
                      className={styles.cartCounterButton}
                      onClick={() => handleSubQuantity(item.id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className={styles.cartCounterButton}
                      onClick={() => handleAddQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <strong>{priceFormatter(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
          <div className={styles.cartSubtotal}>
            <span>Sub total</span>
            <strong>{priceFormatter(cart.totalAmount)}</strong>
          </div>
          <div className={styles.cartTotal}>
            <span className={styles.cartTotalLabel}>Total: </span>
            <strong className={styles.cartTotalPriceLabel}>
              {priceFormatter(cart.totalAmount)}
            </strong>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
