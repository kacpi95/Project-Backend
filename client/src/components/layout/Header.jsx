import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link to='/' className={styles.link}>
            Home
          </Link>
          <button className={styles.linkButton}>Sign out</button>
          <Link to='/signin' className={styles.link}>
            Sign in
          </Link>
          <Link to='/signup' className={styles.link}>
            Sign up
          </Link>
        </div>
        <h1 className={styles.title}>MyAds</h1>
        <div className={styles.navRight}>
          <Link to={'/ads/add'} className={styles.addAdLink}>
            Dodaj nowe ogłoszenie +
          </Link>
        </div>
      </nav>
    </header>
  );
}
