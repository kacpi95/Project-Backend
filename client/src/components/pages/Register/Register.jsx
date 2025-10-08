import { useState } from 'react';
import styles from './Register.module.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authRedux';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Label from '../../common/Label/Label';

export default function Register() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    formData.append('numberPhone', number);
    formData.append('avatar', avatar);

    setLoading('loading');

    try {
      const resultAction = await dispatch(register(formData));

      if (register.fulfilled.match(resultAction)) {
        setLoading('success');
        navigate('/login');
      } else if (register.rejected.match(resultAction)) {
        const errorMsg = resultAction.error.message;

        if (errorMsg.includes('400')) setLoading('clientError');
        else if (errorMsg.includes('409')) setLoading('loginError');
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
      <h1 className={styles.header}>Registration</h1>
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

      {loading === 'loginError' && (
        <Alert variant='warning'>
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to user other login.</p>
        </Alert>
      )}

      {loading === 'loading' && (
        <Spinner animation='border' role='status' className='d-block mx-auto'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <Label htmlFor='login'>Login:</Label>
        <Input
          type='text'
          id='login'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <Label htmlFor='password'>Password:</Label>
        <Input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Label htmlFor='number'>Telephone number:</Label>
        <Input
          type='number'
          id='number'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <Label htmlFor='avatar'>Avatar:</Label>
        <Input
          type='file'
          id='avatar'
          onChange={(e) => setAvatar(e.target.files[0])}
        />

        <div className={styles.buttons}>
          <Button type='submit' className={styles.saveBtn}>
            Save
          </Button>
          <Button className={styles.cancelBtn} onClick={handleClickCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
