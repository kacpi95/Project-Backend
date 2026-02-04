import styles from './EditPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchAdId, updateAd } from '../../redux/adsRedux';
import { useEffect, useState } from 'react';
import Form from '../../features/Form/Form';
import SpinnerLoading from '../../common/SpinnerLoading/SpinnerLoading';

export default function EditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { currentAd, loading, error } = useSelector((state) => state.ads);
  const user = useSelector((state) => state.auth.user);

  const [data, setData] = useState({
    title: '',
    text: '',
    image: null,
    price: '',
    location: '',
    aboutSeller: '',
  });

  const [imageUrl, setImageUrl] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const BACKEND_URL =
    process.env.REACT_APP_API_BACKEND || 'http://localhost:8000';

  useEffect(() => {
    dispatch(fetchAdId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentAd) {
      setData({
        title: currentAd.title || '',
        text: currentAd.text || '',
        image: null,
        price: currentAd.price ?? '',
        location: currentAd.location || '',
        aboutSeller: currentAd.aboutSeller || '',
      });

      setImageUrl(`${BACKEND_URL}/uploads/${currentAd.image}`);
      setLoaded(true);
    }
  }, [currentAd, BACKEND_URL]);

  useEffect(() => {
    const seller =
      currentAd && typeof currentAd.userId === 'object'
        ? currentAd.userId
        : null;

    if (loaded && seller && user && String(user.id) !== String(seller._id)) {
      navigate(`/ads/${id}`);
    }
  }, [loaded, currentAd, user, navigate, id]);

  function handleChange(e) {
    const { id, value, files, type } = e.target;

    if (type === 'file') {
      setData((prev) => ({ ...prev, [id]: files?.[0] || null }));
    } else {
      setData((prev) => ({ ...prev, [id]: value }));
    }

    setErrors((prev) => ({ ...prev, [id]: '' }));
    setFormError('');
  }

  async function handleClickSaveChanges(e) {
    e.preventDefault();

    const newErrors = {};
    if (!data.title.trim()) newErrors.title = 'Title is required';
    if (!data.text.trim()) newErrors.text = 'Text is required';
    if (!String(data.price).trim()) newErrors.price = 'Price is required';
    if (!data.location.trim()) newErrors.location = 'Location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    setFormError('');

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('text', data.text);
    formData.append('price', data.price);
    formData.append('location', data.location);
    formData.append('aboutSeller', data.aboutSeller);

    if (data.image) formData.append('image', data.image);

    try {
      await dispatch(updateAd({ id, adData: formData })).unwrap();
      navigate('/');
    } catch (err) {
      const msg = String(err?.message || '').toLowerCase();

      if (msg.includes('401') || msg.includes('unauthorized')) {
        setFormError('You must be logged in to edit an ad.');
        navigate('/login');
      } else if (msg.includes('403') || msg.includes('author')) {
        setFormError('You are not allowed to edit this ad.');
        navigate(`/ads/${id}`);
      } else {
        setFormError('Could not save changes. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  }

  function handleClickCancel(e) {
    e.preventDefault();
    navigate('/');
  }

  if (loading || !loaded) return <SpinnerLoading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Edit Ad</h1>

      {formError && <p className={styles.error}>{formError}</p>}

      <Form
        data={data}
        onCancel={handleClickCancel}
        onChange={handleChange}
        onSubmit={handleClickSaveChanges}
        imageUrl={imageUrl}
        error={errors}
      />

      {saving && <SpinnerLoading />}
    </div>
  );
}
