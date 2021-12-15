import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {rootStore} from '../../store';
import { Navigate, useNavigate } from 'react-router-dom'
import { signOutUser } from '../../actions/users';


export const Logout = () => {
  const userState = useSelector((state: rootStore) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (userState && userState.id) {
      // logout
      dispatch(signOutUser());
      navigate('/');
    }
  });

  return (
    (userState && userState.isAuthUser && <Navigate to="/" />) ||
      <div>
        <h1>Terminando sesion</h1>
      </div>
  );
}