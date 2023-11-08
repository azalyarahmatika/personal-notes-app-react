import React from "react";
import { addNote } from "../utils/network-data";
import CheckButton from "../component/CheckButton";
import { useNavigate } from "react-router-dom";
import { LocaleConsumer } from "../context/LocaleContext";
import useInput from "../hooks/useInput";

const AddNotePage = () => {
    const [title, handleTitleChange] = useInput("");
    const [body, handleBodyChange] = useInput("");
    const navigate = useNavigate();

    const onSubmitEventHandler = async (event) => {
        event.preventDefault();
        await addNote({title, body});      
        navigate("/");
    }

    return (
        <LocaleConsumer>
        {
            ({locale})=> {
                return (
                    <form className='add-new-page__input' onSubmit={onSubmitEventHandler}>
                        <h2>{locale === "id" ? "Tambah Catatan" : "Add Note"}</h2>
                        <input className="add-new-page__input__title" value={title} type="text" placeholder={locale === "id" ? "Judul Catatan" :"Note Title"} onChange={handleTitleChange} />             
                        <textarea className="add-new-page__input__body" value={body} type="text" placeholder={locale === "id" ? "Tulis catatan" :"Write a note"} onChange={handleBodyChange} />
                        <CheckButton type='submit'/>
                    </form>
                )
            }
        }
        </LocaleConsumer>
    );
}

export default AddNotePage;