import styles from './Form.module.css';
import Label from '../../common/Label/Label';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { useEffect, useState } from 'react';

export default function Form({
  data,
  onSubmit,
  onChange,
  onCancel,
  imageUrl,
  error = {},
}) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!(data.image instanceof File)) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(data.image);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [data.image]);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Label htmlFor='title'>Title:</Label>
      <Input
        id='title'
        type='text'
        className={styles.input}
        value={data.title}
        onChange={onChange}
      />
      {error?.title && <p className={styles.error}>{error.title}</p>}

      <Label htmlFor='text'>Text:</Label>
      <Input
        id='text'
        type='text'
        className={styles.input}
        value={data.text}
        onChange={onChange}
      />
      {error?.text && <p className={styles.error}>{error.text}</p>}

      <Label htmlFor='image'>Photo:</Label>
      <Input
        id='image'
        type='file'
        className={styles.input}
        onChange={onChange}
      />
      {error?.image && <p className={styles.error}>{error.image}</p>}

      {!previewUrl && imageUrl && (
        <>
          <Label>Current Photo:</Label>
          <img src={imageUrl} alt='Current' className={styles.imagePreview} />
        </>
      )}

      {previewUrl && (
        <>
          <Label>New Photo:</Label>
          <img
            src={previewUrl}
            alt='New preview'
            className={styles.imagePreview}
          />
        </>
      )}

      <Label htmlFor='price'>Price:</Label>
      <Input
        id='price'
        type='number'
        className={styles.input}
        value={data.price}
        onChange={onChange}
      />
      {error?.price && <p className={styles.error}>{error.price}</p>}

      <Label htmlFor='location'>Location:</Label>
      <Input
        id='location'
        type='text'
        className={styles.input}
        value={data.location}
        onChange={onChange}
      />
      {error?.location && <p className={styles.error}>{error.location}</p>}

      <Label htmlFor='aboutSeller'>About the seller:</Label>
      <Input
        id='aboutSeller'
        type='text'
        className={styles.input}
        value={data.aboutSeller}
        onChange={onChange}
      />
      {error?.aboutSeller && (
        <p className={styles.error}>{error.aboutSeller}</p>
      )}

      <div className={styles.buttons}>
        <Button type='submit' className={styles.saveBtn}>
          Save
        </Button>
        <Button className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
