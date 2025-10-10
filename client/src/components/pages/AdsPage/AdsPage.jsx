import { useEffect } from 'react';
import styles from './AdsPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAd, fetchAdId } from '../../redux/adsRedux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Button from '../../common/Button/Button';

export default function AdsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentAd, loading, error } = useSelector((state) => state.ads);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) dispatch(fetchAdId(id));
  }, [dispatch, id]);

  if (loading || !currentAd || typeof currentAd.userId !== 'object') {
    return <p>Loading...</p>;
  }
  if (error) return <p>Error {error}</p>;
  if (!currentAd) return <p>Not Data...</p>;

  function handleClickEditAds(e) {
    e.preventDefault();
    navigate(`/ads/${currentAd._id}/edit`);
  }

  async function handleClickDeleteAd(e) {
    e.preventDefault();
    await dispatch(deleteAd(id));
    navigate('/');
  }

  const userTrue = user && currentAd && user.id === currentAd.userId._id;

  const adImageUrl = `${process.env.REACT_APP_API_ROOT}/uploads/${currentAd.image}`;
  const userAvatarUrl = `${process.env.REACT_APP_API_ROOT}/uploads/${currentAd.userId.avatar}`;

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <h2 className={styles.login}>{currentAd.userId?.login}</h2>
        <p className={styles.number}>{currentAd.userId?.numberPhone}</p>
        <img
          src={userAvatarUrl}
          className={styles.avatar}
          alt={`Avatar of ${currentAd.userId?.login}`}
        />
      </div>
      <div key={currentAd._id} className={styles.card}>
        <img src={adImageUrl} alt={currentAd.title} className={styles.image} />
        <h3 className={styles.title}>{currentAd.title}</h3>
        <p className={styles.location}>{currentAd.location}</p>
        <p className={styles.text}>{currentAd.text}</p>
        <p className={styles.date}>{currentAd.date}</p>
        {userTrue && (
          <div className={styles.buttons}>
            <Button className={styles.editBtn} onClick={handleClickEditAds}>
              Edit
            </Button>
            <Button className={styles.cancelBtn} onClick={handleClickDeleteAd}>
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
