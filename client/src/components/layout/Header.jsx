import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authRedux';

export default function Header({ user }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link to='/' className={styles.link}>
            Home
          </Link>
          {/* <button className={styles.linkButton}>Sign out</button>
          <Link to='/signin' className={styles.link}>
            Sign in
          </Link>
          <Link to='/signup' className={styles.link}>
            Sign up
          </Link> */}
          {user ? (
            <>
              <span className={styles.userInfo}>
                Zalogowany jako: {user.login}
              </span>
              <button onClick={handleLogout} className={styles.linkButton}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className={styles.link}>
                Sign in
              </Link>
              <Link to='/register' className={styles.link}>
                Sign up
              </Link>
            </>
          )}
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
