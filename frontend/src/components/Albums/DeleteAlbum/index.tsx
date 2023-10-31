



import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useDispatch } from 'react-redux';

import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { thunk_deleteAlbum } from '../../../store/albums';


function DeleteAlbum({albumId, albumTitle}) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  
  const deleteFunction = () => {
    dispatch(thunk_deleteAlbum(albumId))
    setShowModal(!showModal)
  }
  
  return (
    <>
     <button className="flex flex-row justify-between mb-3 ml-2 p-1 items-center border border-gray-500 w-28" onClick={() => setShowModal(true)}>
                                    <Icon icon="icon-park-outline:delete" color="gray"  width="17" />
                                    <div className="text-xs">Delete Album</div>
                                </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

            <div className="w-96 h-48 flex flex-col justify-evenly items-center p-2">
                <h1 className="text-md font-bold text-red-500">Are you sure you want to delete this album?</h1>
                <div className="text-sm underline underline-offset-4">{albumTitle}</div>
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

export default DeleteAlbum;