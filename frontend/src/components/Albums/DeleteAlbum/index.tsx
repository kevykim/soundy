



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

            <div className="w-650 h-48 flex flex-col justify-evenly p-2">
              <div className="flex flex-row justify-between border-b-2 border-gray-200">
                      <h1 className="flex self-center font-semibold text-2xl mb-2">Delete Album</h1>
                      <div className="flex justify-end">
                      <button onClick={() => setShowModal(false)} className="hover:bg-gray-300 rounded-sm p-2">
                            <Icon icon="octicon:x-12" />
                            </button>
                      </div>
                      </div>
                <h1 className="text-xs font-bold self-center">Are you sure you want to delete {albumTitle}? This action cannot be undone.</h1>
                <div className="self-center">
                <button className="w-20 h-8 bg-gray-200 hover:bg-green-200 text-white rounded-sm font-bold " onClick={() => setShowModal(false)}>Cancel</button>
                <button className="w-20 h-8 bg-gray-300 hover:bg-green-900 text-white rounded-sm font-bold ml-1" onClick={deleteFunction}>Delete</button>
                </div>
            </div>
        </Modal>
      )}
    </>
  );
}

export default DeleteAlbum;