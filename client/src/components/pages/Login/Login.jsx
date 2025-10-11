import { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authRedux';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Label from '../../common/Label/Label';
import SpinnerLoading from '../../common/SpinnerLoading/SpinnerLoading';

export default function Login() {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!loginValue.trim() || !password.trim()) {
      setError('Please fill in the login and password fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const resultAction = await dispatch(
        login({ login: loginValue, password })
      );

      if (login.fulfilled.match(resultAction)) {
        navigate('/');
      } else if (login.rejected.match(resultAction)) {
        setError('Incorrect login or password');
        alert('Incorrect login or password');
      }
    } catch (err) {
      setError('A server error occurred. Please try again later');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleClickCancel() {
    navigate('/');
  }
  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        <Label htmlFor='login'>Login:</Label>
        <Input
          type='text'
          id='login'
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
        />
        <Label htmlFor='password'>Password:</Label>
        <Input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.buttons}>
          <Button type='submit' className={styles.saveBtn}>
            Log in
          </Button>
          <Button className={styles.cancelBtn} onClick={handleClickCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
