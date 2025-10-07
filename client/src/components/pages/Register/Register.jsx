import { useState } from 'react';
import styles from './Register.module.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authRedux';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

export default function Register() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [laoding, setLoading] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    formData.append('numberPhone', number);
    formData.append('avatar', avatar);

    await dispatch(register(formData));
    // navigate('/login');
  }
  function handleClickCancel() {
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Rejestracja</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor='login'>
          Login:
        </label>
        <input
          type='text'
          id='login'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className={styles.input}
        />

        <label className={styles.label} htmlFor='password'>
          Hasło:
        </label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <label className={styles.label} htmlFor='number'>
          Numer telefonu:
        </label>
        <input
          type='number'
          id='number'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className={styles.input}
        />

        <label className={styles.label} htmlFor='avatar'>
          Avatar:
        </label>
        <input
          type='file'
          id='avatar'
          onChange={(e) => setAvatar(e.target.files[0])}
          className={styles.input}
        />

        <div className={styles.buttons}>
          <button type='submit' className={styles.saveBtn}>
            Zapisz
          </button>
          <button
            type='button'
            className={styles.cancelBtn}
            onClick={handleClickCancel}
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
}
