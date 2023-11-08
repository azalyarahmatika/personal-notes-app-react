import React from "react";
import PropTypes from "prop-types";
import { MdDeleteOutline } from "react-icons/md";

const DeleteButton = ({ id, onDelete}) => {
    return  <button className="action" title="Delete" onClick={ () => onDelete(id)}> 
                <MdDeleteOutline/>
            </button>
};

DeleteButton.propTypes = {
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default DeleteButton;