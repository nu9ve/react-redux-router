import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
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
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path={["/user", "/login" , "/register"]}>
            { 
              (isLoggedIn && 
              <About />) ||
              <Auth />
            }
          </Route>
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/create/:topicId" component={Editor} />
          <Route exact path="/read/:essayId" component={Reader} />
          <Route exact path="/topics" component={Topics} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  
  );
}

export default App;