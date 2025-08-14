import { ClipLoader } from 'react-spinners';

import styles from './spinner.module.scss'

export const Spinner = () => (
  <div className={styles["spinner-container"]}>
    <ClipLoader
      color="var(--blue)"
      size={50}
      speedMultiplier={0.8}
    />
  </div>
);