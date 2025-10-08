import { useState } from 'react';
import styles from './AddPage.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addAd } from '../../redux/adsRedux';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Label from '../../common/Label/Label';

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
      <h1 className={styles.header}>Add a new Ad</h1>
      <form className={styles.form} onSubmit={handleClickAddAd}>
        <Label htmlFor='title'>Title:</Label>
        <Input
          id='title'
          type='text'
          className={styles.input}
          value={data.title}
          onChange={handleChange}
        />
        <Label htmlFor='text'>Text:</Label>
        <Input
          id='text'
          type='text'
          className={styles.input}
          value={data.text}
          onChange={handleChange}
        />
        <Label htmlFor='image'>Photo:</Label>
        <Input
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
        <Label htmlFor='price'>Price:</Label>
        <Input
          type='number'
          id='price'
          className={styles.input}
          value={data.price}
          onChange={handleChange}
        />
        <Label htmlFor='location'>Location:</Label>
        <Input
          id='location'
          type='text'
          className={styles.input}
          value={data.location}
          onChange={handleChange}
        />
        <Label htmlFor='aboutSeller'>About the seller:</Label>
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
