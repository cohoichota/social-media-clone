import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Register.module.css';
import axios from 'axios';

const Register = () => {
   const username = useRef();
   const email = useRef();
   const password = useRef();
   const passwordAgain = useRef();

   const navigate = useNavigate();
   const routeChange = () => {
      navigate('/login');
   };

   const handleClick = async (event) => {
      event.preventDefault();
      if (passwordAgain.current.value !== password.current.value) {
         passwordAgain.current.setCustomValidity('Password does not match!');
      } else {
         const user = {
            username: username.current.value,
            password: password.current.value,
            email: email.current.value,
         };
         try {
            await axios.post('/auth/register', user);
            navigate('/login');
         } catch (error) {
            console.log(error);
         }
      }
   };

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
                     placeholder="Username"
                     required
                     ref={username}
                     className={classes.loginInput}
                  />
                  <input
                     placeholder="Email"
                     required
                     ref={email}
                     className={classes.loginInput}
                     type="email"
                  />
                  <input
                     placeholder="Password"
                     required
                     ref={password}
                     className={classes.loginInput}
                     type="password"
                     minLength="6"
                  />
                  <input
                     placeholder="Password Again"
                     required
                     ref={passwordAgain}
                     className={classes.loginInput}
                     type="password"
                  />
                  <button className={classes.loginButton} type="submit">
                     Sign Up
                  </button>
                  <button
                     className={classes.loginRegisterButton}
                     onClick={routeChange}
                  >
                     Log into Account
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Register;
