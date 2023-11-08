import React from "react";
import PropTypes from "prop-types";
import { MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
import { archiveNote, unarchiveNote } from "../utils/network-data";
import { useNavigate } from "react-router-dom";

const ArchiveButton = ({ archived, id }) => {
    const navigate = useNavigate();
    const onArchiveHandler = async (id) => {
        await archiveNote(id);
        navigate("/archived")
    }

    const onUnArchiveHandler = async (id) => {
        await unarchiveNote(id);
        navigate("/")
    }

    if(archived){
        return  <button className="action" title="Unarchive" onClick={ () => onUnArchiveHandler(id)}> 
                    <MdOutlineUnarchive />
                </button>
    }
    else {
        return  <button className="action" title="Archive" onClick={ () => onArchiveHandler(id)} > 
                    <MdOutlineArchive />
                </button>
    }
};

ArchiveButton.propTypes = {
    id: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired
}

export default ArchiveButton;