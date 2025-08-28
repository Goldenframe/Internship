import { ClipLoader } from 'react-spinners';

import styles from './styles.module.scss'

export const Spinner = () => (
  <div className={styles.spinnerContainer}>
    <ClipLoader
      color="var(--blue)"
      size={50}
      speedMultiplier={0.8}
    />
  </div>
);