import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Posts from './pages/Posts';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/posts' element={<Posts />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
