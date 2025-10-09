import { useState } from 'react';
import styles from './AddPage.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addAd } from '../../redux/adsRedux';
import Form from '../../features/Form/Form';

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
  const [error, setError] = useState({});

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

    const newErrors = {};
    if (!data.title.trim()) newErrors.title = 'Tytuł nie może być pusty.';
    if (!data.text.trim())
      newErrors.text = 'Treść ogłoszenia nie może być pusta.';
    if (!data.price.trim()) newErrors.price = 'Cena nie może być pusta.';
    if (!data.location.trim())
      newErrors.location = 'Lokalizacja nie może być pusta.';
    if (!data.image) newErrors.image = 'Proszę dodać zdjęcie.';

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    setError({});

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
      <Form
        data={data}
        onCancel={handleClickCancel}
        onChange={handleChange}
        onSubmit={handleClickAddAd}
        error={error}
      />
    </div>
  );
}
