import React from "react";
import PropTypes from "prop-types";
import { getArchivedNotes } from "../utils/network-data";
import { showFormattedDate } from "../utils";
import SearchBar from "../component/SearchBar";
import NoteList from "../component/NoteList";
import EmptyList from "../component/EmptyList";
import Preloader from "../component/Preloader";

const ArchivedPage = ({ stateSearch, onSearchHandler}) => {
    const [archivedNotes, setArchivedNotes] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        getArchivedNotes().then(({ data }) => {
            setArchivedNotes(data.map(note => {
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
                <SearchBar homePage={false} stateSearch={stateSearch} onSearchHandler={onSearchHandler} />
                <Preloader/>
            </div>
        )        
    }

    return (
        <div>
            <SearchBar homePage={false} stateSearch={stateSearch} onSearchHandler={onSearchHandler} />
            {!archivedNotes.length ? <EmptyList/> : <NoteList notes={archivedNotes} stateSearch={stateSearch}/>}
        </div>
    )   
}

ArchivedPage.propTypes = {
    stateSearch: PropTypes.string,
    onSearchHandler: PropTypes.func.isRequired
};

export default ArchivedPage;