import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Posts from './pages/Posts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/posts' element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
