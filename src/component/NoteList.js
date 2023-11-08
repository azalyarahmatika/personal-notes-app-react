import React from "react";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../context/LocaleContext";
import NoteItem from "./NoteItem";

const NoteList = ({notes, stateSearch}) => {
    const foundNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(
            stateSearch.toLowerCase()
        );
    });

    if (!foundNotes.length) {
        return (
            <LocaleConsumer>
                {
                    ({locale})=> {
                        return (
                            <p>{locale==="id"? "Catatan tidak ditemukan!" : "Note is not found!"}</p>
                        )
                    }
                }
            </LocaleConsumer>
        )
    }

    else {
        return (
        <div className="notes-list"> 
            {
                foundNotes.map((note) => (                    
                    <NoteItem
                    title={note.title}
                    createdAt={note.createdAt}
                    id={note.id}
                    body={note.body}
                    archived={note.archived}
                    key={note.id}
                    {...note} />
                ))
            }
        </div>
        )
    }
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    stateSearch: PropTypes.string.isRequired
};

export default NoteList;