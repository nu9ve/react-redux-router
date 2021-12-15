import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { rootStore } from './store';

import { Auth } from './pages/auth/Auth';
import { Logout } from './pages/auth/Logout';
import { Home } from './pages/Home';
import { Topics } from './pages/Topics';
import { About } from './pages/About';
import { Editor } from './pages/Editor';
import { Reader } from './pages/Reader';
import { NotFound } from './pages/NotFound';
import { Navbar } from './components/Navbar';

import './App.scss';

function App() {
  const userState = useSelector((state: rootStore) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (userState && userState.id) {
      // dispatch(getUser(userState.id));
      console.log('yes user state');
      setIsLoggedIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About/>} />
          <Route path="/user|/login|/register" element={((isLoggedIn && 
              <About />) ||
              <Auth />)}/>
          <Route path="/logout" element={<Logout/>} />
          <Route path="/create/:topicId" element={<Editor/>} />
          <Route path="/read/:essayId" element={<Reader/>} />
          <Route path="/topics" element={<Topics/>} />
          <Route path="/" element={<Home/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  
  );
}

export default App;