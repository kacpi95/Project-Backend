import styles from './SpinnerLoading.module.css';
import Spinner from 'react-bootstrap/Spinner';

export default function SpinnerLoading() {
  return (
    <div className={styles.spinner}>
      <Spinner
        animation='border'
        role='status'
        variant='light'
        style={{
          width: '4rem',
          height: '4rem',
        }}
      >
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
}
