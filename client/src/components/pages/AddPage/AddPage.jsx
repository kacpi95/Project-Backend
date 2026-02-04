import { useState } from 'react';
import styles from './AddPage.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addAd } from '../../redux/adsRedux';
import Form from '../../features/Form/Form';
import SpinnerLoading from '../../common/SpinnerLoading/SpinnerLoading';

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
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  function handleChange(e) {
    const { id, value, files, type } = e.target;
    if (type === 'file') {
      setData((prev) => ({ ...prev, [id]: files?.[0] || null }));
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
    if (!data.title.trim()) newErrors.title = 'Title cannot be empty';
    if (!data.text.trim())
      newErrors.text = 'The content of the advertisement cannot be empty';
    if (!String(data.price).trim()) newErrors.price = 'Price cannot be empty';
    if (!data.location.trim()) newErrors.location = 'Location cannot be empty';
    if (!data.image) newErrors.image = 'Please add a photo';

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});
    setFormError('');
    setLoading();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('text', data.text);
    formData.append('price', data.price);
    formData.append('location', data.location);
    formData.append('aboutSeller', data.aboutSeller);
    formData.append('image', data.image);

    try {
      await dispatch(addAd(formData)).unwrap();
      navigate('/');
    } catch (err) {
      const msg = String(err?.message || '').toLowerCase();

      if (msg.includes('401') || msg.includes('unauthorized')) {
        setFormError('You must be logged in to add an ad.');
        navigate('/login');
      } else {
        setFormError('Could not add the ad. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }
  if (loading) return <SpinnerLoading />;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Add a new Ad</h1>

      {formError && <p className={styles.error}>{formError}</p>}
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
