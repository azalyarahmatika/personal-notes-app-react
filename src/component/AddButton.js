import React from "react";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";

const AddButton = () => {
    return  <Link to="/notes/new">
                <button className="homepage__action action" title="Add Note">
                    <MdAdd/>
                </button>
            </Link>
    };

export default AddButton;