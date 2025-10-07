import { useState } from 'react';
import styles from './Login.module.css';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authRedux';

export default function Login() {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading('loading');

    try {
      const resultAction = await dispatch(
        login({ login: loginValue, password })
      );

      if (login.fulfilled.match(resultAction)) {
        setLoading('success');
        navigate('/');
      } else if (login.rejected.match(resultAction)) {
        const errorMsg = resultAction.error.message;

        if (errorMsg.includes('400')) setLoading('clientError');
        else setLoading('serverError');
      }
    } catch (error) {
      setLoading('serverError');
      console.error(error);
    }
  }
  function handleClickCancel() {
    navigate('/');
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.header}>Logowanie</h1>

      {loading === 'success' && (
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully registered! You can now log in..</p>
        </Alert>
      )}

      {loading === 'serverError' && (
        <Alert variant='danger'>
          <Alert.Heading>Something went wrong..</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}

      {loading === 'clientError' && (
        <Alert variant='danger'>
          <Alert.Heading>No enough data</Alert.Heading>
          <p>You have to fill all the fields.</p>
        </Alert>
      )}

      {loading === 'loading' && (
        <Spinner animation='border' role='status' className='d-block mx-auto'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}

      <label className={styles.label} htmlFor='login'>
        Login:
      </label>
      <input
        type='text'
        id='login'
        value={loginValue}
        onChange={(e) => setLoginValue(e.target.value)}
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
      <div className={styles.buttons}>
        <button type='submit' className={styles.saveBtn}>
          Zaloguj
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
  );
}
