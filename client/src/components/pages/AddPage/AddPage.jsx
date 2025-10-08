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
    image: null,
    price: '',
    location: '',
    aboutSeller: '',
  });

  function handleChange(e) {
    const { id, value, files } = e.target;
    if (id === 'image') {
      setData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [id]: value }));
    }
  }

  function handleClickCancel() {
    navigate('/');
  }

  async function handleClickAddAd(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('text', data.text);
    formData.append('price', data.price);
    formData.append('location', data.location);
    formData.append('aboutSeller', data.aboutSeller);
    if (data.image) formData.append('image', data.image);

    await dispatch(addAd(formData));
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Edit Ad</h1>
      <form className={styles.form} onSubmit={handleClickAddAd}>
        <label className={styles.label} htmlFor='title'>
          Title:
        </label>
        <input
          type='text'
          id='title'
          className={styles.input}
          value={data.title}
          onChange={handleChange}
        />
        <label className={styles.label} htmlFor='text'>
          Text:
        </label>
        <input
          type='text'
          id='text'
          className={styles.input}
          value={data.text}
          onChange={handleChange}
        />
        <label className={styles.label} htmlFor='image'>
          Photo:
        </label>
        <input
          type='file'
          id='image'
          className={styles.input}
          onChange={handleChange}
        />
        {data.image instanceof File && (
          <img
            src={URL.createObjectURL(data.image)}
            alt='Podgląd'
            className={styles.imagePreview}
          />
        )}
        <label className={styles.label} htmlFor='price'>
          Price:
        </label>
        <input
          type='number'
          id='price'
          className={styles.input}
          value={data.price}
          onChange={handleChange}
        />
        <label className={styles.label} htmlFor='location'>
          Location:
        </label>
        <input
          type='text'
          id='location'
          className={styles.input}
          value={data.location}
          onChange={handleChange}
        />
        <label className={styles.label} htmlFor='aboutSeller'>
          About the seller:
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
            Save
          </button>
          <button
            type='button'
            className={styles.cancelBtn}
            onClick={handleClickCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
