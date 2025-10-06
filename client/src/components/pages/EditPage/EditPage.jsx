import styles from './EditPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchAdId, updateAd } from '../../redux/adsRedux';
import { useEffect, useState } from 'react';

export default function EditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentAd } = useSelector((state) => state.ads);

  const [data, setData] = useState({
    title: '',
    text: '',
    image: '',
    price: '',
    location: '',
    aboutSeller: '',
  });

  useEffect(() => {
    dispatch(fetchAdId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentAd) {
      setData({
        title: currentAd.title || '',
        text: currentAd.text || '',
        image: currentAd.image || '',
        price: currentAd.price || '',
        location: currentAd.location || '',
        aboutSeller: currentAd.aboutSeller || '',
      });
    }
  }, [currentAd]);

  function handleChange(e) {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  }

  async function handleClickSaveChanges(e) {
    e.preventDefault();
    await dispatch(updateAd({ id, adData: data }));
    navigate('/');
  }

  function handleClickCancel(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Edytuj Ogłoszenie</h1>
      <form className={styles.form} onSubmit={handleClickSaveChanges}>
        <label className={styles.label} htmlFor='title'>
          Tytuł:
        </label>
        <input
          type='text'
          id='title'
          className={styles.input}
          value={data.title}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor='text'>
          Tekst:
        </label>
        <input
          type='text'
          id='text'
          className={styles.input}
          value={data.text}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor='image'>
          Zdjęcie:
        </label>
        <input
          type='text'
          id='image'
          className={styles.input}
          value={data.image}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor='price'>
          Cena:
        </label>
        <input
          type='number'
          id='price'
          className={styles.input}
          value={data.price}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor='location'>
          Lokalizacja:
        </label>
        <input
          type='text'
          id='location'
          className={styles.input}
          value={data.location}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor='aboutSeller'>
          O sprzedającym:
        </label>
        <input
          type='text'
          id='aboutSeller'
          className={styles.input}
          value={data.aboutSeller}
          onChange={handleChange}
        />

        <div className={styles.buttons}>
          <button type='submit' className={styles.saveBtn}>
            Zapisz
          </button>
          <button
            type='button'
            className={styles.cancelBtn}
            onClick={handleClickCancel}
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
}
