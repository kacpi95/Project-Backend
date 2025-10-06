import { useEffect } from 'react';
import styles from './AdsPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdId } from '../../redux/adsRedux';
import logo from './kacpiAI.jpg';
import { useParams } from 'react-router';

export default function AdsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentAd, loading, error } = useSelector((state) => state.ads);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) dispatch(fetchAdId(id));
  }, [dispatch, id]);

  if (loading) return <p>Ładwanie...</p>;
  if (error) return <p>Błąd {error}</p>;
  if (!currentAd) return <p>Brak danych...</p>;

  return (
    <div className={styles.container}>
      <div className={styles?.user}>
        <h2 className={styles.login}>{user?.login}</h2>
        <p className={styles.number}>{user?.numberPhone}</p>
        <img src={logo} className={styles.avatar} alt='k' />
      </div>
      <div key={currentAd._id} className={styles.card}>
        <img src={logo} alt={currentAd.title} className={styles.image} />
        <h3 className={styles.title}>{currentAd.title}</h3>
        <p className={styles.location}>{currentAd.location}</p>
        <p className={styles.text}>{currentAd.text}</p>
        <p className={styles.date}>{currentAd.date}</p>
      </div>
    </div>
  );
}
