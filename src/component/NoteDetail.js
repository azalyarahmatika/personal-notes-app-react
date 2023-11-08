import React from "react";
import PropTypes from "prop-types";

const NoteDetail = ({ title, createdAt, body}) => {
    return (
        <div className="detail-page">
            <p className="detail-page__title">{title}</p>
            <p className="detail-page__createdAt">{createdAt}</p>
            <p className="detail-page__body">{body}</p>
        </div>
    );
}
  
NoteDetail.propTypes = {
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
};
  
export default NoteDetail;  