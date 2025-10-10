import styles from './EditPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { fetchAdId, updateAd } from '../../redux/adsRedux';
import { useEffect, useState } from 'react';
import Form from '../../features/Form/Form';
import Spinner from 'react-bootstrap/Spinner';

export default function EditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentAd, loading } = useSelector((state) => state.ads);

  const [data, setData] = useState(null);

  // const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    dispatch(fetchAdId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentAd && currentAd._id === id) {
      setData({
        title: currentAd.title || '',
        text: currentAd.text || '',
        image: null,
        price: currentAd.price || '',
        location: currentAd.location || '',
        aboutSeller: currentAd.aboutSeller || '',
        actuImage: currentAd.image,
      });
    }
  }, [currentAd, id]);

  function handleChange(e) {
    const { id, value, files, type } = e.target;

    if (type === 'image') {
      setData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [id]: value }));
    }
  }

  async function handleClickSaveChanges(e) {
    e.preventDefault();

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

  function handleClickCancel() {
    navigate('/');
  }

  if (loading || !data) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner animation='border' />
      </div>
    );
  }
  const imageUr = `${process.env.REACT_APP_API_URL_ADS}/../uploads/${data.actuImage}`;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Edit Ad</h1>
      <Form
        data={data}
        onCancel={handleClickCancel}
        onChange={handleChange}
        onSubmit={handleClickSaveChanges}
        imageUrl={imageUr}
        error={{}}
      />
    </div>
  );
}
