import React from "react";
import PropTypes from "prop-types";
import {LocaleConsumer} from "../context/LocaleContext";

const SearchBar = ({onSearchHandler, homePage, stateSearch}) => {    
    const onSearchEventHandler = (event) => {
        onSearchHandler(event.target.value);
    }

    return (
            <LocaleConsumer>
                {
                    ({locale})=> {
                        return (
                            <div className="search-bar">
                                { homePage ? <h2>{locale==="id" ? "Catatan Aktif" : "Active Note"}</h2>:<h2>{locale==="id" ? "Catatan Arsip" : "Archived Note"}</h2> }
                                <input value={stateSearch} 
                                    onChange={onSearchEventHandler} 
                                    type="text" placeholder={locale==="id" ? "Cari catatan..." : "Search note..."}>
                                </input>
                            </div>
                        )
                    }
                }
            </LocaleConsumer>
    );
}

SearchBar.propTypes = {
    onSearchHandler: PropTypes.func.isRequired,
    homePage: PropTypes.bool.isRequired,
    stateSearch: PropTypes.string.isRequired,
};

export default SearchBar;