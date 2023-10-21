import { useDispatch } from "react-redux";
import { thunk_deleteComment } from "../../../store/comments";
import { Modal } from "../../../context/Modal";
import { useState } from "react";


function DeleteComment ({id, currentComment}) {
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
        <button className="text-xs w-14 h-4 bg-green-800 hover:bg-green-900 text-white rounded-md font-bold" onClick={openM}>Delete</button>
        {showM && (
        <Modal onClose={() => setShowM(false)}>
            <div className="w-96 h-48 flex flex-col justify-evenly items-center p-2">
                <h1 className="text-md font-bold text-red-500">Are you sure you want to delete this comment?</h1>
                <div className="text-sm underline underline-offset-4">{currentComment}</div>
                <div className="mt-2">
            <button className="w-20 h-10 bg-green-700 hover:bg-green-900 text-white rounded-md font-bold" onClick={okFunc}>Delete</button>
            <button className="w-20 h-10 bg-green-500 hover:bg-green-200 text-white rounded-md font-bold ml-1" onClick={cancelFunc}>Cancel</button>
                </div>
            </div>
        </Modal>
            )
        }
        </>
    )
}




export default DeleteComment;