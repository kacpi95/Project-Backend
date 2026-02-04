import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authRedux';

export default function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch (e) {
      console.error('Logout failed', e);
    } finally {
      navigate('/');
    }
  };
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link to='/' className={styles.link}>
            Home
          </Link>

          {user ? (
            <>
              <button onClick={handleLogout} className={styles.linkButton}>
                Sign out
              </button>
              <span className={styles.userInfo}>
                Logged in as: {user.login}
              </span>
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
          <Link to='/ads/add' className={styles.addAdLink}>
            Add a new ad +
          </Link>
        </div>
      </nav>
    </header>
  );
}
