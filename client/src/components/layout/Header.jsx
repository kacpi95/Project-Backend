import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to='/' className={styles.link}>
          Home
        </Link>
        <button className={styles.linkButton}>Sign out</button>
        <>
          <Link to='/signin' className={styles.link}>
            Sign in
          </Link>
          <Link to='/signup' className={styles.link}>
            Sign up
          </Link>
        </>
      </nav>
    </header>
  );
}
