import { PropsWithChildren } from "react"

import styles from './styles.module.scss'

export const BooksContainer = ({children}: PropsWithChildren) => {
  return (
    <div className={styles.booksContainer}>{children}</div>
  )
}
