import styles from './Home.module.css';
// import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className={styles.container}>
      <form>
        <input type='text' placeholder='Search ...' />
        <button type='submit' className={styles.searchButton}>
          Search
        </button>
      </form>
      <div className={styles.grid}>
        <div className={styles.card}>
          <img src='' alt='' className={styles.image} />
          <h3 className={styles.title}>x</h3>
          <p className={styles.location}></p>
          {/* <Link className={styles.readMore}>Read More</Link> */}
        </div>
      </div>
    </div>
  );
}
