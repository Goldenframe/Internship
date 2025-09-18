import Link from 'next/link';

import styles from './styles.module.css';

export const Header = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <li className={styles.item}>
          <Link href="/" className={styles.link}>
            Главная
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/favorites" className={styles.link}>
            Избранное
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/logs" className={styles.link}>
            Логи
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/diagnostics" className={styles.link}>
            Диагностика
          </Link>
        </li>
      </ul>
    </nav>
  );
};
