



import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useDispatch } from 'react-redux';
import { thunk_deleteSong } from '../../../store/songs';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';


function DeleteModal({id, songTitle}) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  
  const deleteFunction = () => {
    dispatch(thunk_deleteSong(id))
    setShowModal(!showModal)
  }
  
  return (
    <>
      <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 disabled:bg-gray-500 rounded shadow-sm" onClick={() => setShowModal(true)}>
        <Icon icon="icon-park-outline:delete" />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

            <div className="w-96 h-48 flex flex-col justify-evenly items-center p-2">
                <h1 className="text-md font-bold text-red-500">Are you sure you want to delete this track?</h1>
                <div className="text-sm underline underline-offset-4">{songTitle}</div>
                <div className="mt-2">
                <button className="w-20 h-10 bg-green-700 hover:bg-green-900 text-white rounded-md font-bold" onClick={deleteFunction}>Delete</button>
                <button className="w-20 h-10 bg-green-500 hover:bg-green-200 text-white rounded-md font-bold ml-1" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </div>
        </Modal>
      )}
    </>
  );
}

export default DeleteModal;