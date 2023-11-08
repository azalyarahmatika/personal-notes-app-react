import React from "react";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../context/LocaleContext";
import useInput from "../hooks/useInput";
 
const RegisterInput = ({register}) => {
    const [name, handleNameChange] = useInput("");
    const [email, handleEmailChange] = useInput("");
    const [password, handlePasswordChange] = useInput("");
    const [confirmPassword, handleConfirmPasswordChange] = useInput("");
 
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
          alert("wrong password")
          handleConfirmPasswordChange("");
        }
        else {
          register({
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword
          });
        }
    }
 
    return (
      <LocaleConsumer>
      {
        ({locale})=> {
          return (
                  <form onSubmit={onSubmitHandler} className='input-register'>
                    <label>{locale === "id"? "Nama" : "Name"}</label>
                    <input type="text" value={name} onChange={handleNameChange} />
                    <label>{locale === "id"? "Alamat Email" : "Email Address"}</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                    <label>{locale === "id"? "Kata Sandi" : "Password"}</label>
                    <input type="password" autoComplete='current-password' value={password} onChange={handlePasswordChange} />
                    <label>{locale === "id"? "Konfirmasi Kata Sandi" : "Confirm Password"}</label>
                    <input type="password" autoComplete='current-password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    <button>{locale === "id"? "Daftar" : "Register"}</button>
                  </form>
          )
        }
      }
      </LocaleConsumer>
    )
  
}
 
RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
 
export default RegisterInput;