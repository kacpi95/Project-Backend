import { useEffect } from 'react';
import styles from './AdsPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAd, fetchAdId } from '../../redux/adsRedux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Button from '../../common/Button/Button';
import SpinnerLoading from '../../common/SpinnerLoading/SpinnerLoading';

export default function AdsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { currentAd, loading, error } = useSelector((state) => state.ads);
  const { user } = useSelector((state) => state.auth);

  const BACKEND_URL =
    process.env.REACT_APP_API_BACKEND;

  useEffect(() => {
    if (id) dispatch(fetchAdId(id));
  }, [dispatch, id]);

  if (loading) return <SpinnerLoading />;
  if (error) return <p>Error {error}</p>;
  if (!currentAd) return <p>Not Data...</p>;

  const seller = typeof currentAd.userId === 'object' ? currentAd.userId : null;

  const userTrue = !!user && !!seller && String(user.id) === String(seller._id);

  const adImageUrl = `${BACKEND_URL}/uploads/${currentAd.image}`;
  const userAvatarUrl = seller?.avatar
    ? `${BACKEND_URL}/uploads/${seller.avatar}`
    : null;

  const formattedDate = currentAd.date
    ? new Date(currentAd.date).toLocaleString()
    : '';

  function handleClickEditAds(e) {
    e.preventDefault();
    navigate(`/ads/${currentAd._id}/edit`);
  }

  async function handleClickDeleteAd(e) {
    e.preventDefault();
    await dispatch(deleteAd(id));
    navigate('/');
  }

  return (
    <div className={styles.container}>
      {seller && (
        <div className={styles.user}>
          <h2 className={styles.login}>{seller.login}</h2>
          <p className={styles.number}>{seller.numberPhone}</p>
          {userAvatarUrl && (
            <img
              src={userAvatarUrl}
              className={styles.avatar}
              alt={`Avatar of ${seller.login}`}
            />
          )}
        </div>
      )}

      <div className={styles.card}>
        <img src={adImageUrl} alt={currentAd.title} className={styles.image} />
        <h3 className={styles.title}>{currentAd.title}</h3>
        <p className={styles.location}>{currentAd.location}</p>
        <p className={styles.text}>{currentAd.text}</p>
        {formattedDate && <p className={styles.date}>{formattedDate}</p>}

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
