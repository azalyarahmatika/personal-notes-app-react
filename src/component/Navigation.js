import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { FiLogOut } from 'react-icons/fi';
import ToggleTheme from "./ToggleTheme";
import ToggleLocale from "./ToggleLocale";
import { LocaleConsumer } from "../context/LocaleContext";

const Navigation = ({logout, name}) => {
    return (
        <LocaleConsumer>
        {
            ({locale})=> {
                return (
                    <header>
                        { locale === "id" ? <h1><Link to="/">Aplikasi Catatan</Link></h1>: <h1><Link to="/">Notes App</Link></h1>}                                  
                        <nav className="navigation">
                            <ul>
                                { name ? <li><p><Link to="/archived"> { locale === "id" ? "Arsip" : "Archived"}</Link></p></li> : null}
                                <li><ToggleLocale/></li>
                                <li><ToggleTheme/></li>
                                { name ? <li><button className="button-logout" onClick={logout}><FiLogOut />{name}</button></li> : null}
                            </ul>
                        </nav>
                    </header>
                )
            }
        }
        </LocaleConsumer>
    );
    
}

Navigation.prototype = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.bool.isRequired
}

export default Navigation;