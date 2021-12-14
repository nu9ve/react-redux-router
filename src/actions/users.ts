import { Dispatch } from 'redux';
import axios from 'axios';

import config from '../config.json';
import { 
  UserDispatchTypes, 
  USER_LOGIN, USER_ERROR, USER_SUCCESS, USER_LOADING, USER_CLEAN,
  SignUpDataI 
} from '../types/users';


// ths functions / actions are used at componets through dispatch
export const getUser = (userID: string) => async (dispatch: Dispatch<UserDispatchTypes>) => {
  try {
    console.log('trying to get this user -> ', userID);
    dispatch({
      type: USER_LOADING
    });
    const res = await axios.get(`${config.SERVER_URL}/api/v1.0/user/${userID}`);
    dispatch({
      type: USER_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: USER_ERROR
    });
  }
};

export const signUpUser = (userData: SignUpDataI) => async (dispatch: Dispatch<UserDispatchTypes>) => {
  try {
    dispatch({
      type: USER_LOADING
    });
    const res = await axios({
      method: 'post',
      url:`${config.SERVER_URL}/auth/register`,
      data: userData
    });
    dispatch({
      type: USER_SUCCESS,
      payload: res.data
    });
    // save at local storage

    const data = {
      token: res.data.token,
      user_id: res.data.id
    };

    localStorage.setItem('writeon_token',data.token);
    localStorage.setItem('writeon_userid',data.user_id);

    dispatch({
      type: USER_LOGIN
    });
  } catch (e) {
    dispatch({
      type: USER_ERROR
    });
  }
}; 

export const signInUser = (username: string, password: string) => async (dispatch: Dispatch<UserDispatchTypes>) => {
  try {
    dispatch({
      type: USER_LOADING
    });
    const res = await axios({
      method: 'post',
      url: `${config.SERVER_URL}/auth/login`,
      data: {
        username,
        password
      }
    });
    const data = {
      token: res.data.token,
      user_id: res.data.id
    };
    localStorage.setItem('writeon_token',data.token);
    localStorage.setItem('writeon_userid',data.user_id);

    dispatch({
      type: USER_LOGIN
    });

  } catch(e) {
    // console.log('bad passwrod???', e);
    // console.log(e.response.status);
    let message = 'Ocrruio un error interno, por favor intenta mas tarde';
    if (e.response.status === 403) {
      message = 'Correo o contraseña incorrecta'
    }
    dispatch({
      type: USER_ERROR,
      message,
    });
  }
}

export const signOutUser = () => (dispatch: Dispatch<UserDispatchTypes>) => {
  try {
    localStorage.clear();
    dispatch({
      type: USER_CLEAN
    });
  } catch(e) {
    dispatch({
      type: USER_ERROR
    });
  }
};