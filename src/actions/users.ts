import { Dispatch } from 'redux';
import axios, { AxiosResponse, AxiosError } from "axios";
import config from '../config.json';
import { 
  UserDispatchTypes, 
  USER_LOGIN, USER_ERROR, USER_SUCCESS, USER_LOADING, USER_CLEAN,
  SignUpDataI 
} from '../types/users';
// import { returnErrors } from "../errors/actions";


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

  } catch(e: unknown) {
    let message = 'Ocrruio un error interno, por favor intenta mas tarde';
    // console.log(e);
    if (axios.isAxiosError(e)) {
      const errResp = e.response;
      // Handle your error type safe here
      if (errResp?.status === 403) {
        message = 'Correo o contraseña incorrecta'
      }
  
      dispatch({
        type: USER_ERROR,
        message,
      });
    } else {
      // Handle the unknown
    }
    
  }
  
  
  // catch(err: AxiosError){
  //   if(err.response) dispatch(returnErrors(err.response.data, err.response.status, REGISTER_FAILED));
            
  //   else if(err.request) dispatch(returnErrors(err.request.data, err.request.status, REGISTER_FAILED));
         
  //   else dispatch(returnErrors("An internal error occurred", 500, REGISTER_FAILED));
  // }

  // dispatch({
  //   type: USER_ERROR,
  //   message,
  // });
  
  
  // catch(e as) {
  //   // console.log('bad passwrod???', e);
  //   // console.log(e.response.status);
  //   let message = 'Ocrruio un error interno, por favor intenta mas tarde';
  //   console.log(e);
  //   if (e.response.status === 403) {
  //     message = 'Correo o contraseña incorrecta'
  //   }

    // dispatch({
    //   type: USER_ERROR,
    //   message,
    // });

  // }
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