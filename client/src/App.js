import Home from './components/pages/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import AdsPage from './components/pages/AdsPage/AdsPage';
import NoPage from './components/pages/NoPage/NoPage';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ads/:id' element={<AdsPage />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
