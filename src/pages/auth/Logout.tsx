import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {rootStore} from '../../store';
import { Redirect, useHistory } from 'react-router-dom'
import { signOutUser } from '../../actions/users';


export const Logout = () => {
  const userState = useSelector((state: rootStore) => state.user);
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    if (userState && userState.id) {
      // logout
      dispatch(signOutUser());
      history.push('/');
    }
  });

  return (
    (userState && userState.isAuthUser && <Redirect to="/" />) ||
      <div>
        <h1>Terminando sesion</h1>
      </div>
  );
}