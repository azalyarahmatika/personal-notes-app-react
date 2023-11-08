import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { LocaleConsumer } from '../context/LocaleContext';
 
const LoginInput = ({login}) => {
    const [email, handleEmailChange] = useInput("");
    const [password, handlePasswordChange] = useInput("");

    const onSubmitHandler = (event) => {
        event.preventDefault();
    
        login({
        email: email,
        password: password,
        });
    }

    return (
      <LocaleConsumer>
      {
        ({locale})=> {
          return (
            <form onSubmit={onSubmitHandler} className='input-login'>
              <label>Email</label>
              <input type="email" value={email} onChange={handleEmailChange} />
              <label>{locale === "id"? "Kata Sandi" : "Password"}</label>
              <input type="password" value={password} onChange={handlePasswordChange} />
              <button>Login</button>
            </form>
          )
        }
      }
      </LocaleConsumer>
    );
}
 
LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}
 
export default LoginInput;