import { CircularProgress } from '@mui/material';

import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
   const email = useRef();
   const password = useRef();
   const { user, isFetching, dispatch } = useContext(AuthContext);

   const navigate = useNavigate();
   const routeChange = () => {
      navigate('/register');
   };

   const handleClick = (event) => {
      event.preventDefault();
      loginCall(
         { email: email.current.value, password: password.current.value },
         dispatch
      );
   };

   console.log(user);

   return (
      <div className={classes.login}>
         <div className={classes.loginWrapper}>
            <div className={classes.loginLeft}>
               <h3 className={classes.loginLogo}>Lamasocial</h3>
               <span className={classes.loginDesc}>
                  Connect with friends and the world around you on Lamasocial.
               </span>
            </div>
            <div className={classes.loginRight}>
               <form className={classes.loginBox} onSubmit={handleClick}>
                  <input
                     placeholder="Email"
                     type="email"
                     required
                     className={classes.loginInput}
                     ref={email}
                  />
                  <input
                     placeholder="Password"
                     type="password"
                     required
                     minLength="6"
                     className={classes.loginInput}
                     ref={password}
                  />
                  <button
                     className={classes.loginButton}
                     type="submit"
                     disabled={isFetching}
                  >
                     {isFetching ? (
                        <CircularProgress color="success" size="20px" />
                     ) : (
                        'Log In'
                     )}
                  </button>
                  <span className={classes.loginForgot}>Forgot Password?</span>
                  <button
                     className={classes.loginRegisterButton}
                     onClick={routeChange}
                  >
                     {isFetching ? (
                        <CircularProgress color="success" size="20px" />
                     ) : (
                        'Create a New Account'
                     )}
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;
