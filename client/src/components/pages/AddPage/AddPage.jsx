import { useState } from 'react';
import styles from './AddPage.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addAd } from '../../redux/adsRedux';

export default function AddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    title: '',
    text: '',
    image: '',
    price: '',
    location: '',
    aboutSeller: '',
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  }

  function handleClickCancel() {
    navigate('/');
  }

  async function handleClickAddAd(e) {
    e.preventDefault();
    await dispatch(addAd(data));
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Edytuj Ogłoszenie</h1>
      <form className={styles.form} onSubmit={handleClickAddAd}>
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
