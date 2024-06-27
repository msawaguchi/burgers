import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'

import { addItemToCart, updateItemQuantity } from '../../redux/cartSlice'
import { RootState, AppDispatch } from '../../redux/store'
import { priceFormatter } from '../../utils/priceFormatter'
import { MenuItem, ModifierItem } from '../../lib/definitions'

import styles from './modal.module.css'
import closeIcon from '../../assets/icon_close.png'
import checkbox from '../../assets/icon_checkbox.svg'
import checkboxActive from '../../assets/icon_checkbox_filled.svg'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  item: MenuItem | null
}

function Modal({ isOpen, onClose, item }: ModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  const cart = useSelector((state: RootState) => state.cart)

  const [quantity, setQuantity] = useState<number>(1)
  const [modifierItem, setModifierItem] = useState<ModifierItem | null>(null)

  useEffect(() => {
    if (isOpen && item) {
      const existingCartItem = cart.items.find(
        (cartItem) => cartItem.id === item.id,
      )
      setQuantity(existingCartItem ? existingCartItem.quantity : 1)
    }
  }, [isOpen, item, cart.items])

  const handleAddToCart = () => {
    if (!item) return
    if (!isOpen) return

    if (quantity > 0) {
      const existingCartItem = cart.items.find(
        (cartItem) => cartItem.id === item.id,
      )
      if (!existingCartItem) {
        dispatch(
          addItemToCart({
            id: item.id,
            name: item.name,
            price: modifierItem ? modifierItem.price : item.price,
            quantity,
          }),
        )
      } else {
        dispatch(
          updateItemQuantity({
            id: item.id,
            quantity: existingCartItem.quantity + quantity,
          }),
        )
      }
    }

    onClose()
  }

  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((event.target as HTMLElement).classList.contains(styles.modalOverlay)) {
      onClose()
    }
  }

  const handleSubQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddQuantity = () => {
    setQuantity(quantity + 1)
  }

  return isOpen && item
    ? ReactDOM.createPortal(
        <div className={styles.modalOverlay} onClick={handleClickOutside}>
          <div className={styles.modalContainer}>
            <div className={styles.modalMainContent}>
              <img
                src={closeIcon}
                className={styles.closeButton}
                alt="Close"
                onClick={onClose}
              />
              {item.images && item.images[0]?.image && (
                <img
                  src={item.images[0].image}
                  className={styles.modalImage}
                  alt={item.name}
                />
              )}
              <div className={styles.descriptionSection}>
                <strong className={styles.name}>{item.name}</strong>
                {item.description && (
                  <p className={styles.description}>{item.description}</p>
                )}
              </div>
              {item.modifiers && (
                <>
                  <div className={styles.optionsHeader}>
                    <strong>{item.modifiers[0].name}</strong>
                    <span>Select one option</span>
                  </div>
                  <div className={styles.optionList}>
                    {item.modifiers[0].items.map(
                      (modifierOption) =>
                        modifierOption.visible && (
                          <div
                            key={modifierOption.id}
                            className={styles.optionListItem}
                            onClick={() => setModifierItem(modifierOption)}
                          >
                            <div className={styles.optionListItemDescription}>
                              <strong>{modifierOption.name}</strong>
                              <span>
                                {priceFormatter(modifierOption.price)}
                              </span>
                            </div>
                            <span>
                              <img
                                src={
                                  modifierItem &&
                                  modifierItem.id === modifierOption.id
                                    ? checkboxActive
                                    : checkbox
                                }
                                alt={modifierOption.name}
                              />
                            </span>
                          </div>
                        ),
                    )}
                  </div>
                </>
              )}
            </div>
            <div className={styles.modalFooter}>
              <div className={styles.cartCounter}>
                <button
                  className={styles.cartCounterButton}
                  onClick={handleSubQuantity}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className={styles.cartCounterButton}
                  onClick={handleAddQuantity}
                >
                  +
                </button>
              </div>
              <button
                className={`${styles.addToCartButton} ${item.modifiers && !modifierItem ? styles.disabled : ''}`}
                onClick={handleAddToCart}
                disabled={item.modifiers && !modifierItem}
              >
                Add to Order •
                {priceFormatter(
                  (modifierItem ? modifierItem.price : item.price) * quantity,
                )}
              </button>
            </div>
          </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement,
      )
    : null
}

export default Modal
