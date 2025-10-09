import { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authRedux';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Label from '../../common/Label/Label';
import StatusAlertLogin from '../../features/StatusAlert/StatusAlert.Login';

export default function Login() {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    setStatus('loading');

    try {
      const resultAction = await dispatch(
        login({ login: loginValue, password })
      );

      if (login.fulfilled.match(resultAction)) {
        setStatus('success');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else if (login.rejected.match(resultAction)) {
        const errorMsg = resultAction.error.message;

        if (errorMsg.includes('400')) setStatus('clientError');
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
      <h1 className={styles.header}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <StatusAlertLogin status={status} />

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
