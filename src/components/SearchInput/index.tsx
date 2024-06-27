import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../redux/store'
import { setSearchTerm } from '../../redux/searchSlice'

import styles from './searchinput.module.css'
import searchIcon from '../../assets/icon_search.png'

function SearchInput() {
  const dispatch = useDispatch()
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value))
  }

  return (
    <div className={styles.search}>
      <img src={searchIcon} alt="" className={styles.icon} />

      <input
        className={styles.input}
        placeholder="Search menu items"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  )
}

export default SearchInput
