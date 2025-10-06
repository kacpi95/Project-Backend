import Home from './components/pages/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import { Provider } from 'react-redux';
import store from './components/redux/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
