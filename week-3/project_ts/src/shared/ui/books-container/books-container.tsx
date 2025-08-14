import { PropsWithChildren } from "react"

import styles from './books-container.module.scss'

export const BooksContainer = ({children}: PropsWithChildren) => {
  return (
    <div className={styles['books-container']}>{children}</div>
  )
}
