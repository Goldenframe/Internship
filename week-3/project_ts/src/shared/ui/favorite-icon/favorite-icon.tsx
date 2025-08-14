import { FaHeart } from 'react-icons/fa'

import styles from './favorite-icon.module.scss'

export const FavoriteIcon = () => {
  return (
    <FaHeart className={styles["favorite-icon"]} />
  )
}
