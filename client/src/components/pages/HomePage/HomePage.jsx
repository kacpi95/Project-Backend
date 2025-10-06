import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import logo from './kacpiAI.jpg';
import Header from '../../layout/Header';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAds } from '../../redux/adsRedux';
import { useParams } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { list, loading, error } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(fetchAds(id));
  }, [dispatch, id]);

  if (loading) return <p>Ładwanie...</p>;
  if (error) return <p>Błąd: {error}</p>;

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
        {list.map((ad) => {
          return (
            <div key={ad._id} className={styles.card}>
              <img src={logo} alt={ad.title} className={styles.image} />
              <h3 className={styles.title}>{ad.title}</h3>
              <p className={styles.location}>{ad.location}</p>
              <Link className={styles.readMore} to={`/ads/${ad._id}`}>
                Read More
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
