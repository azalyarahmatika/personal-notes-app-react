import React from "react";
import { Link } from "react-router-dom";
import LoginInput from "../component/LoginInput";
import { login } from "../utils/network-data";
import { LocaleConsumer } from "../context/LocaleContext";
import PropTypes from "prop-types";
 
const LoginPage = ({loginSuccess}) => {
    const onLogin = async ({ email, password }) => {
        const { error, data } = await login({ email, password });
    
        if (!error) {
        loginSuccess(data);
        }
    }
 
    return (
        <LocaleConsumer>
           {
                ({locale})=>{
                    return (
                        <section>
                            <h2>{locale === "id" ? "Silahkan login untuk menggunakan aplikasi." : "Login to use app, please."} </h2>
                            <LoginInput login={onLogin} />
                            <p>{locale === "id" ? "Belum punya akun? " : "Don't have account? "} 
                            <span><Link to="/register"> {locale === "id" ? "Daftar di sini" : "Register here"}</Link></span></p>
                        </section>
                    )
                }
            }
        </LocaleConsumer>
    )
}
 
LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired
};

export default LoginPage;