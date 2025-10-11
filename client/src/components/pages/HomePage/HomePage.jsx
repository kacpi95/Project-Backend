import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAds, searchAds } from '../../redux/adsRedux';
import { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import SpinnerLoading from '../../common/SpinnerLoading/SpinnerLoading';

export default function Home() {
  const dispatch = useDispatch();

  const { list, loading, error } = useSelector((state) => state.ads);

  const [searchId, setSearchId] = useState('');

  const BACKEND_URL =
    process.env.REACT_APP_API_BACKEND || 'http://localhost:8000';

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const handleClickSearch = (e) => {
    e.preventDefault();
    dispatch(searchAds(searchId));
  };

  if (loading) return <SpinnerLoading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <form className={styles.searchForm} onSubmit={handleClickSearch}>
        <Input
          noDefaultClass
          type='text'
          className={styles.searchInput}
          placeholder='Search ...'
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Button type='submit' className={styles.searchBtn}>
          Search
        </Button>
      </form>
      <div className={styles.grid}>
        {list.map((ad) => {
          const adImageUrl = `${BACKEND_URL}/uploads/${ad.image}`;
          return (
            <div key={ad._id} className={styles.card}>
              <img src={adImageUrl} alt={ad.title} className={styles.image} />
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
