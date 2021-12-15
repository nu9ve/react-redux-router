
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { rootStore } from '../../store';
import config from '../../config.json';
import { signUpUser, signInUser } from '../../actions/users';
import { SignUpDataI } from '../../types/users';


export type User = {
  id:   string;
  username: string;
  password: string;
  email: string;
}

export function Auth() {
  const location = useLocation();
  const history = useNavigate();
  const dispatch = useDispatch();
  const userStore = useSelector((state: rootStore) => state.user)
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('signUp');
  
  useEffect(() => {
    if(location.pathname.indexOf('login')>=0){
      setMode('login')
    }
    console.log('useEffect2', userStore);
    console.log('useEffect3', userStore);
  }, [location])

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  const handleSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      password: { value: string };
      username: { value: string };
    };
    const username = target.username.value; // typechecks!
    const password = target.password.value; // typechecks!
    
    if(username === "" || password === ""){
      setError('All data is needed');
      setIsBusy(false);
      return;
    }

    setIsBusy(true);
    console.log('pre', userStore);
    dispatch(signInUser(username, password));    
    console.log('poar', userStore);
    console.log('poar', userStore);
  }
  

  const handleSubmitSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
      username: { value: string };
    };
    const email = target.email.value; // typechecks!
    const username = target.username.value; // typechecks!
    const password = target.password.value; // typechecks!
    
    if(email === "" || username === "" || password === ""){
      setError('All data is needed');
      setIsBusy(false);
      return;
    }

    if(!validateEmail(email)){
      setError('Invalid email');
      setIsBusy(false);
      return;
    }

    setIsBusy(true);
    const data: SignUpDataI = {
      username,
      password,
      email
    }
    dispatch(signUpUser(data));    
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event);
  }

  // const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //   console.log(event);
  // }

  return <div className="wrapper">
       <h1 style={{display:'flex'}}>How About Them { (mode == 'signUp' && 'Apples') || (mode == 'login' && 'Pears')}
        <span style={{alignSelf: 'start', fontSize: '12px', color: isBusy ? 'green' : 'black' }}>
          { (mode == 'signUp' && <Link to="/login">login</Link>) || (mode == 'login' && 'sign up')}
        </span>
       </h1>
       <h2>{userStore.logged} - {userStore.email} - {userStore.id}</h2>
       {
         (error && 
         <div>
           {error}
         </div>)
       }
       { (isBusy &&
         <div>
           Registering user...
           {/* <ul>
             {Object.entries(formData).map(([name, value]) => (
               <li key={name}><strong>{name}</strong>: {value.toString()}</li>
             ))}
           </ul> */}
         </div>)
         ||
        <form onSubmit={(mode==='login' && handleSubmitLogin) || handleSubmitSignUp}>
         <fieldset>
           { mode === 'signUp' && <label>
             <p>Email</p>
             <input name="email"  type="text" onChange={handleChange}/>
           </label> }
           <label>
             <p>Username</p>
             <input name="username" type="text" onChange={handleChange}/>
           </label>
           <label>
             <p>Password</p>
             <input name="password" type="password" onChange={handleChange}/>
           </label>
         </fieldset>
         <fieldset>
          <label>
            <p>Asectas?</p>
            <input type="checkbox" name="gift-wrap" onChange={handleChange} />
          </label>
        </fieldset>
         <button type="submit">Submit</button>
       </form>
       }
     </div>
}
// import { useState, useReducer, MouseEvent, ChangeEvent } from 'react';
// import {useParams, useNavigate} from "react-router-dom";
// import config from '../config.json';

// const formReducer = (state, event: ChangeEvent<HTMLInputElement>) => {
//   return {
//     ...state,
//     [event.name]: event.value
//   }
//  }
 
// export function SignUp() {
//   const [formData, setFormData] = useReducer(formReducer, {});
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = event => {
//     event.preventDefault();
//     setSubmitting(true);

//     setTimeout(() => {
//       setSubmitting(false);
//     }, 3000);
//   }

//   const handleChange = event: ChangeEvent<HTMLInputElement> => {
//     setFormData({
//       name: event.target.name,
//       value: event.target.value,
//     });
//   }
  
//   return
//     <div className="wrapper">
//       <h1>How About Them Apples</h1>
//       {submitting &&
//         <div>
//           You are submitting the following:
//           <ul>
//             {Object.entries(formData).map(([name, value]) => (
//               <li key={name}><strong>{name}</strong>: {value.toString()}</li>
//             ))}
//           </ul>
//         </div>
//       }
//       <form onSubmit={handleSubmit}>
//         <fieldset>
//           <label>
//             <p>Name</p>
//             <input name="name" onChange={handleChange}/>
//           </label>
//         </fieldset>
//         <fieldset>
//          <label>
//            <p>Apples</p>
//            <select name="apple" onChange={handleChange}>
//                <option value="">--Please choose an option--</option>
//                <option value="fuji">Fuji</option>
//                <option value="jonathan">Jonathan</option>
//                <option value="honey-crisp">Honey Crisp</option>
//            </select>
//          </label>
//          <label>
//            <p>Count</p>
//            <input type="number" name="count" onChange={handleChange} step="1"/>
//          </label>
//          <label>
//            <p>Gift Wrap</p>
//            <input type="checkbox" name="gift-wrap" onChange={handleChange} />
//          </label>
//        </fieldset>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
// }