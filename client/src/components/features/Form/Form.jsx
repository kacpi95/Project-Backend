import styles from './Form.module.css';
import Label from '../../common/Label/Label';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

export default function Form({ data, onSubmit, onChange, onCancel, imageUrl }) {
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
      <Label htmlFor='text'>Text:</Label>
      <Input
        id='text'
        type='text'
        className={styles.input}
        value={data.text}
        onChange={onChange}
      />

      <Label htmlFor='image'>Photo:</Label>
      <Input
        id='image'
        type='file'
        className={styles.input}
        onChange={onChange}
      />
      {data.image instanceof File && (
        <>
          <Label>New Photo:</Label>
          <img
            src={URL.createObjectURL(data.image)}
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
      <Label htmlFor='location'>Location:</Label>
      <Input
        id='location'
        type='text'
        className={styles.input}
        value={data.location}
        onChange={onChange}
      />
      <Label htmlFor='aboutSeller'>About the seller:</Label>
      <Input
        id='aboutSeller'
        type='text'
        className={styles.input}
        value={data.aboutSeller}
        onChange={onChange}
      />
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
