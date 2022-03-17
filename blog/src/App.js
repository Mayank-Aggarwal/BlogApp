import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import OldBlogs from './pages/OldBlogs';
import BlogForm from './pages/BlogForm';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CompleteBlog from './pages/CompleteBlog';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('data')){
      dispatch({ type: 'UPDATE_LOGIN_DATA', payload: JSON.parse(localStorage.getItem('data')) });
    }
  }, [])

  return (
    <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/blogForm" element={<BlogForm/>}/>
      <Route path="/oldblog" element={<OldBlogs/>}/>
      <Route path="/completeblog" element={<CompleteBlog />}/>
      <Route path="/:category" element={<Home />}/>
    </Routes>
    <Footer/>
  </BrowserRouter>
  );
}

export default App;
