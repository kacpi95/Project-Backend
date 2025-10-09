import { useState } from 'react';
import styles from './Register.module.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authRedux';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Label from '../../common/Label/Label';
import StatusAlertRegister from '../../features/StatusAlertRegister/StatusAlertRegister';

export default function Register() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    formData.append('numberPhone', number);
    formData.append('avatar', avatar);

    setStatus('loading');

    try {
      const resultAction = await dispatch(register(formData));

      if (register.fulfilled.match(resultAction)) {
        setStatus('success');
        navigate('/login');
      } else if (register.rejected.match(resultAction)) {
        const errorMsg = resultAction.error.message;

        if (errorMsg.includes('400')) setStatus('clientError');
        else if (errorMsg.includes('409')) setStatus('loginError');
        else setStatus('serverError');
      }
    } catch (error) {
      setStatus('serverError');
      console.error(error);
    }
  }
  function handleClickCancel() {
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Registration</h1>
      <StatusAlertRegister status={status} />

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
