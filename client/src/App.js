import Home from './components/pages/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import AdsPage from './components/pages/AdsPage/AdsPage';
import NoPage from './components/pages/NoPage/NoPage';
import EditPage from './components/pages/EditPage/EditPage';
import AddPage from './components/pages/AddPage/AddPage';
import Header from './components/layout/Header';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from './components/redux/authRedux';
import SafeRoute from './components/common/SafeRoute/SafeRoute';
import SpinnerLoading from './components/common/SpinnerLoading/SpinnerLoading';

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/ads/:id' element={<AdsPage />} />
        <Route
          path='/ads/:id/edit'
          element={
            <SafeRoute>
              <EditPage />
            </SafeRoute>
          }
        />
        <Route
          path='/ads/add'
          element={
            <SafeRoute>
              <AddPage />
            </SafeRoute>
          }
        />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
