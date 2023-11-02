import { useDispatch } from "react-redux";
import { thunk_deleteComment } from "../../../store/comments";
import { Modal } from "../../../context/Modal";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

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
            <div className="w-650 h-48 flex flex-col justify-evenly p-2">
                <div className="flex flex-row justify-between border-b-2 border-gray-200">
                      <h1 className="flex self-center font-semibold text-2xl mb-2">Delete Comment</h1>
                      <div className="flex justify-end">
                      <button onClick={() => setShowM(false)} className="hover:bg-gray-300 rounded-sm p-2">
                            <Icon icon="octicon:x-12" />
                            </button>
                      </div>
                      </div>
                <h1 className="text-xs font-bold self-center">Are you sure you want to delete {currentComment}? This action cannot be undone.</h1>
                <div className="self-center">
            <button className="w-20 h-8 bg-gray-200 hover:bg-green-200 text-white rounded-sm font-bold" onClick={cancelFunc}>Cancel</button>
            <button className="w-20 h-8 bg-gray-300 hover:bg-green-900 text-white rounded-sm font-bold ml-1" onClick={okFunc}>Delete</button>
                </div>
            </div>
        </Modal>
            )
        }
        </>
    )
}




export default DeleteComment;