import { 
  UserDispatchTypes, 
  USER_CLEAN, USER_ERROR, USER_LOGIN, USER_SUCCESS, USER_LOADING 
} from '../types/users';


interface DefaultStateI {
  loading: boolean;
  isAuthUser: boolean;
  logged: boolean;
  id: string;
  error: any;
  name: string;
  phone: string;
  email: string;
  address?: string;
  roles?: string[];
  message?: string;
};

const defaultState: DefaultStateI = {
  id: localStorage.getItem('writeon_userid') || '',
  loading: false,
  isAuthUser: !!localStorage.getItem('writeon_userid'),
  logged: false,
  error: null,
  name: '',
  phone: '',
  email: '',
  address: '',
  roles: [],
  message: ''
};


const userReducer = (state: DefaultStateI = defaultState, action: UserDispatchTypes) : DefaultStateI => {
  switch(action.type) {
    case USER_ERROR:
      // console.log('at user error', action);
      return {
        ...state,
        loading: false,
        message: action.message || '',
      }

    case USER_LOADING:
      return {
        ...state,
        loading: true
      }

    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: 'success',
        ...action.payload
      }

    case USER_LOGIN:
      return {
        ...state,
        loading: false,
        logged: true
      };

    case USER_CLEAN:
      return defaultState;

    default:
      return state;
  }
};

export default userReducer


