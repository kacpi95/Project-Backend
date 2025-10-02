import Home from './components/views/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
