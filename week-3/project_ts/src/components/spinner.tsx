import { ClipLoader } from 'react-spinners';

export const Spinner = () => (
  <div className="spinner-container">
    <ClipLoader 
      color="var(--blue)" 
      size={50}
      speedMultiplier={0.8}
    />
  </div>
);