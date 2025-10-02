import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import logo from './kacpiAI.jpg';
import Header from '../../layout/Header';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <form className={styles.searchForm}>
        <input
          className={styles.searchInput}
          type='text'
          placeholder='Search ...'
        />
        <button type='submit' className={styles.searchButton}>
          Search
        </button>
      </form>
      <div className={styles.grid}>
        <div className={styles.card}>
          <img src={logo} alt='' className={styles.image} />
          <h3 className={styles.title}>title</h3>
          <p className={styles.location}>location</p>
          <Link className={styles.readMore}>Read More</Link>
        </div>
      </div>
    </div>
  );
}
