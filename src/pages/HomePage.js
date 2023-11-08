import React from "react";
import PropTypes from "prop-types";
import { showFormattedDate } from "../utils";
import SearchBar from "../component/SearchBar";
import NoteList from "../component/NoteList";
import AddButton from "../component/AddButton";
import EmptyList from "../component/EmptyList";
import {getActiveNotes} from "../utils/network-data";
import Preloader from "../component/Preloader";

const HomePage = ({stateSearch, onSearchHandler}) => {
    const [activeNotes, setActiveNotes] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
  
    React.useEffect(() => {
        getActiveNotes().then(({ data }) => {
            setActiveNotes(data.map(note => {
                return {
                            ...note,
                            createdAt : showFormattedDate(note.createdAt),
                        }
            }));
            setIsLoading(false);
        });
    }, []);

    if(isLoading) {
        return (
            <div>
                <SearchBar homePage={true} stateSearch={stateSearch} onSearchHandler={onSearchHandler} />
                <Preloader/>
            </div>
        )        
    }

    return (
        <div>
            <SearchBar homePage={true} stateSearch={stateSearch} onSearchHandler={onSearchHandler}/>
            {!activeNotes.length ? <EmptyList/> : <NoteList notes={activeNotes} stateSearch={stateSearch} />}
            <AddButton />
        </div>
    )   
}

HomePage.propTypes = {
    stateSearch: PropTypes.string,
    onSearchHandler: PropTypes.func.isRequired
};

export default HomePage;