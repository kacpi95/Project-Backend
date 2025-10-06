import Home from './components/pages/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import AdsPage from './components/pages/AdsPage/AdsPage';
import NoPage from './components/pages/NoPage/NoPage';
import EditPage from './components/pages/EditPage/EditPage';
import AddPage from './components/pages/AddPage/AddPage';
import Header from './components/layout/Header';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ads/:id' element={<AdsPage />} />
          <Route path='/ads/:id/edit' element={<EditPage />} />
          <Route path='/ads/add' element={<AddPage />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
