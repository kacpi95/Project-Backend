import { useState } from 'react';
import styles from './Login.module.css';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authRedux';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Label from '../../common/Label/Label';

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
    <div className={styles.container}>
      <h1 className={styles.header}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
