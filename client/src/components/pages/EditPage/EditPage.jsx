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
  const { currentAd, loading } = useSelector((state) => state.ads);

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
        price: currentAd.price || '',
        location: currentAd.location || '',
        aboutSeller: currentAd.aboutSeller || '',
      });
      setImageUrl(`${BACKEND_URL}/uploads/${currentAd.image}`);
      setLoaded(true);
    }
  }, [currentAd, BACKEND_URL, loaded]);

  function handleChange(e) {
    const { id, value, files, type } = e.target;

    if (type === 'file') {
      setData((prev) => ({ ...prev, [id]: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [id]: value }));
    }

    setErrors((prev) => ({ ...prev, [id]: '' }));
  }

  async function handleClickSaveChanges(e) {
    e.preventDefault();

    const newErrors = {};
    if (!data.title) newErrors.title = 'Title is required';
    if (!data.text) newErrors.text = 'Text is required';
    if (!data.price) newErrors.price = 'Price is required';
    if (!data.location) newErrors.location = 'Location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('text', data.text);
    formData.append('price', data.price);
    formData.append('location', data.location);
    formData.append('aboutSeller', data.aboutSeller);

    if (data.image) {
      formData.append('image', data.image);
    }

    await dispatch(updateAd({ id, adData: formData }));
    navigate('/');
  }

  function handleClickCancel(e) {
    e.preventDefault();
    navigate('/');
  }
  if (loading || !setLoaded) {
    return <SpinnerLoading />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Edit Ad</h1>
      <Form
        data={data}
        onCancel={handleClickCancel}
        onChange={handleChange}
        onSubmit={handleClickSaveChanges}
        imageUrl={imageUrl}
        error={errors}
      />
    </div>
  );
}
