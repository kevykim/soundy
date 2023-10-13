import { useDispatch } from "react-redux";
import { thunk_deleteComment } from "../../../store/comments";
import { Modal } from "../../../context/Modal";
import { useState } from "react";


function DeleteComment ({id}) {
    const dispatch = useDispatch();
    const [showM, setShowM] = useState(false);

    const openM = () => {
        setShowM(!showM)
    }

    const okFunc = () => {
        dispatch(thunk_deleteComment(id))
        setShowM(false)
    }


    const cancelFunc = () => {
        setShowM(false)
    }



    return (
        <>
        <button onClick={openM}>Delete</button>
        {showM && (
        <Modal onClose={() => setShowM(false)}>
            <button onClick={okFunc}>Ok</button>
            <button onClick={cancelFunc}>Cancel</button>
        </Modal>
            )
        }
        </>
    )
}




export default DeleteComment;