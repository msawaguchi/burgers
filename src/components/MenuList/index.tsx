import { useSelector } from 'react-redux'

import { CartItem, MenuItem, Section } from '../../lib/definitions'
import { RootState } from '../../redux/store'
import { priceFormatter } from '../../utils/priceFormatter'

import styles from './menulist.module.css'
import arrowUp from '../../assets/icon_arrow.png'

interface MenuCategoryListProps {
  category: Section
  onClick: (item: MenuItem) => void
}

function MenuList({ category, onClick }: MenuCategoryListProps) {
  const cart = useSelector((state: RootState) => state.cart)

  return (
    <div className={styles.categoryList}>
      <div className={styles.categoryHeader}>
        <span className={styles.categoryTitle}>{category.name}</span>
        <img
          className={styles.categoryTitleArrow}
          src={arrowUp}
          alt="Arrow Up"
        />
      </div>
      {category.items.map(
        (item: MenuItem) =>
          item.visible === 1 && (
            <div
              key={item.id}
              className={styles.categoryListItem}
              onClick={() => onClick(item)}
            >
              <div className={styles.menuListItemLeft}>
                <div className={styles.menuListItemHeader}>
                  {cart.items.find(
                    (cartItem: CartItem) => cartItem.id === item.id,
                  )?.quantity && (
                    <div className={styles.counter}>
                      {
                        cart.items.find(
                          (cartItem: CartItem) => cartItem.id === item.id,
                        )?.quantity
                      }
                    </div>
                  )}
                  <strong className={styles.itemName}>{item.name}</strong>
                </div>
                <span className={styles.itemDescription}>
                  {item.description}
                </span>
                <span className={styles.itemPrice}>
                  {priceFormatter(item.price)}
                </span>
              </div>
              {item.images && (
                <img
                  className={styles.categoryListItemImage}
                  src={item.images[0]?.image}
                  alt={item.name}
                />
              )}
            </div>
          ),
      )}
    </div>
  )
}

export default MenuList
