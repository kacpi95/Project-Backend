import { useState } from 'react';
import styles from './Register.module.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authRedux';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Label from '../../common/Label/Label';

export default function Register() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    if (login.length < 4)
      newErrors.login = 'Login must be at least 4 characters long';
    if (password.length < 6)
      newErrors.password = 'The password must be at least 6 characters long';
    if (number.length < 9)
      newErrors.number = 'The telephone number must be at least 9 digits long';
    if (!avatar) newErrors.avatar = 'Please add an avatar';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    formData.append('numberPhone', number);
    formData.append('avatar', avatar);

    try {
      const resultAction = await dispatch(register(formData));

      if (register.fulfilled.match(resultAction)) {
        navigate('/login');
      } else if (register.rejected.match(resultAction)) {
        if (resultAction.payload?.message?.includes('Login already in use')) {
          setErrors({ form: 'This login is already taken' });
        } else {
          setErrors({ form: 'An error occurred during registration' });
        }
      }
    } catch (err) {
      setErrors({ form: 'A server error occurred. Please try again' });
      console.error(err);
    }
  }

  function handleClickCancel() {
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Registration</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {errors.form && <p className={styles.error}>{errors.form}</p>}

        <Label htmlFor='login'>Login:</Label>
        <Input
          type='text'
          id='login'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        {errors.login && <p className={styles.error}>{errors.login}</p>}

        <Label htmlFor='password'>Password:</Label>
        <Input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <Label htmlFor='number'>Telephone number:</Label>
        <Input
          type='text'
          id='number'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        {errors.number && <p className={styles.error}>{errors.number}</p>}

        <Label htmlFor='avatar'>Avatar:</Label>
        <Input
          type='file'
          id='avatar'
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        {errors.avatar && <p className={styles.error}>{errors.avatar}</p>}

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
