import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NoteItem = ( { title, createdAt, body, id}) => {
    return (
        <div className="note-item">
            <h2 className="note-item__title"> <Link to={`/notes/${id}`}> {title} </Link></h2>
            <p className="note-item__createdAt">{createdAt}</p>                
            <p className="note-item__body">{body}</p>
        </div>
    );
}

NoteItem.propTypes = {
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default NoteItem;