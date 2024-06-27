import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal'
import MenuList from '../MenuList'

import { MenuItem, Section } from '../../lib/definitions'
import { fetchMenuInfo } from '../../redux/menuSlice'
import { RootState, AppDispatch } from '../../redux/store'

import styles from './menu.module.css'

interface MenuProps {
  children: React.ReactNode
}

function Menu({ children }: MenuProps) {
  const dispatch = useDispatch<AppDispatch>()
  const menu = useSelector((state: RootState) => state.menu.data)
  const menuStatus = useSelector((state: RootState) => state.menu.status)
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('Burgers')

  const handleOpenDetailsModal = (item: MenuItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }
  useEffect(() => {
    dispatch(fetchMenuInfo())
  }, [dispatch])

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const filteredMenu =
    menu &&
    menu.sections
      .map((section: Section) => ({
        ...section,
        items: section.items.filter((item) =>
          `${item.name.toLowerCase()} ${item.description?.toLowerCase() || ''}`.includes(
            searchTerm.toLowerCase(),
          ),
        ),
      }))
      .filter((section: Section) => section.items.length > 0)

  if (menuStatus === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.main_content}>
      <div className={styles.categoryOptions}>
        {menu &&
          menu.sections?.map((category: Section) => (
            <div key={category.id} className={styles.categoryOption}>
              <div
                className={`${styles.categoryOptionImageContainer} ${categoryFilter === category.name ? styles.active : ''}`}
                onClick={() => setCategoryFilter(category.name)}
              >
                <img
                  src={category.images[0].image}
                  alt={category.name}
                  className={styles.categoryOptionImage}
                />
              </div>
              <div
                className={`${styles.categoryOptionTitle} ${categoryFilter === category.name ? styles.active : ''}`}
              >
                {category.name}
              </div>
            </div>
          ))}
      </div>
      {searchTerm ? (
        filteredMenu && filteredMenu.length > 0 ? (
          filteredMenu.map((category: Section) => (
            <MenuList
              key={category.id}
              category={category}
              onClick={handleOpenDetailsModal}
            />
          ))
        ) : (
          <div className={styles.noResults}>Nada encontrado</div>
        )
      ) : (
        menu &&
        menu.sections.map((category: Section) => (
          <MenuList
            key={category.id}
            category={category}
            onClick={handleOpenDetailsModal}
          />
        ))
      )}
      <div className={styles.menuFooter}>
        <div className={styles.allergyInfo}>
          <a href="#">View allergy information</a>
        </div>
      </div>
      {children}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
      />
    </div>
  )
}

export default Menu
