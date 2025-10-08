import styles from './EditPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchAdId, updateAd } from '../../redux/adsRedux';
import { useEffect, useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

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
      <h1 className={styles.header}>Edit Ad</h1>
      <form className={styles.form} onSubmit={handleClickSaveChanges}>
        <label className={styles.label} htmlFor='title'>
          Title:
        </label>
        <Input
          id='title'
          type='text'
          className={styles.input}
          value={data.title}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor='text'>
          Text:
        </label>
        <Input
          id='text'
          type='text'
          className={styles.input}
          value={data.text}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor='image'>
          Photo:
        </label>
        <Input
          id='image'
          type='text'
          className={styles.input}
          value={data.image}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor='price'>
          Price:
        </label>
        <Input
          type='number'
          id='price'
          className={styles.input}
          value={data.price}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor='location'>
          Location:
        </label>
        <Input
          id='location'
          type='text'
          className={styles.input}
          value={data.location}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor='aboutSeller'>
          About the seller:
        </label>
        <Input
          id='aboutSeller'
          type='text'
          className={styles.input}
          value={data.aboutSeller}
          onChange={handleChange}
        />

        <div className={styles.buttons}>
          <Button type='submit' className={styles.saveBtn}>
            Save
          </Button>
          <Button className={styles.cancelBtn} onClick={handleClickCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
