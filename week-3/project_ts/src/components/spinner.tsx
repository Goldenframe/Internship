import { ClipLoader } from 'react-spinners';

export function Spinner() {
  return (
    <div className="spinner-container">
      <ClipLoader 
        color="var(--blue)"
        size={50}
        speedMultiplier={0.8}
      />
    </div>
  );
}