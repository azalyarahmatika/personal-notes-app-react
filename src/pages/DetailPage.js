import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteDetail from "../component/NoteDetail";
import ArchiveButton from "../component/ArchiveButton";
import DeleteButton from "../component/DeleteButton";
import NotFoundPage from "./NotFoundPage";
import { getNote, deleteNote } from "../utils/network-data";
import { showFormattedDate } from "../utils";
import Preloader from "../component/Preloader";

const DetailPage = () => {
    const [detailNote, setDetailNote] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        getNote(id).then(({ data }) => {
            data.createdAt = showFormattedDate(data.createdAt);
            setDetailNote(data);
            setIsLoading(false);
        });
    },[id]);
    
    const onDeleteHandler = async (id) => {
        await deleteNote(id);
        setDetailNote(null);
        navigate("/")
    }

    if (isLoading){
        return <Preloader/>
    }

    if (!detailNote) {
        return <NotFoundPage/>
    }

    return (
        <section>
            <NoteDetail title={detailNote.title} body={detailNote.body} createdAt={detailNote.createdAt}/>
            <div className="detail-page__action">
                <ArchiveButton id={id} archived={detailNote.archived} />
                <DeleteButton id={id} onDelete={onDeleteHandler}/>
            </div>
        </section>
    );
}

export default DetailPage;