import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../component/RegisterInput";
import { register } from "../utils/network-data";
import {LocaleConsumer} from "../context/LocaleContext";
 
const RegisterPage = () => {
    const navigate = useNavigate();
    async function onRegisterHandler(user) {
        const { error } = await register(user);
        if (!error) {
            navigate('/');
        }
    }
 
  return (
    <LocaleConsumer>
      {
        ({locale}) => {
          return (
              <section>
                <h2>{locale === "id" ? "Silahkan login untuk menggunakan aplikasi." : "Fill the form to register account."}</h2>
                <RegisterInput register={onRegisterHandler} />
                <p>{locale === "id" ? "Sudah punya akun? " : "Already have an account? "} 
                  <span><Link to="/">{locale === "id" ? "Login di sini" : "Login here"}</Link></span>
                </p>
          </section>
          )
        }
      }
    </LocaleConsumer>
  )
}

export default RegisterPage;