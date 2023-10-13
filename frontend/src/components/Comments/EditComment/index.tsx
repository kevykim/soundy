import { useDispatch } from "react-redux";
import { thunk_editComment, thunk_getAllComments } from "../../../store/comments";
import { useState } from "react";

function EditComment ({username, songId, commentId, body}) {

    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const [editComment, setEditComment] = useState(body);
    const [submitted, setSubmitted] = useState(false)
    

    const updateComment = (event) => {
        event.preventDefault();

        setShowForm(!showForm)
    }

    const okFunc = (event) => {
        event.preventDefault();
        setSubmitted(true);

        return dispatch(thunk_editComment({
            id : commentId,
            body : editComment,
            User : {
                username
            }
        }))

    }

    const cancelFunc = (event) => {
        event.preventDefault();

        setShowForm(false)
    }

    if (submitted) {
        setShowForm(false)
        setSubmitted(false)
        dispatch(thunk_getAllComments(songId))
    }




    return (
        <>
        <button onClick={updateComment}>Edit</button>
        {showForm &&
            <div>
            <form onSubmit={okFunc}>
                <input type="text" value={editComment} onChange={(event) => setEditComment(event.target.value)}></input>
                <button type="submit">Ok</button>
                <button onClick={cancelFunc}>Cancel</button>
            </form>
            </div>}
        </>
    )
}







export default EditComment;