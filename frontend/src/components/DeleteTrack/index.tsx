



import { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { thunk_deleteSong } from '../../store/songs';


function DeleteModal({id}) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  console.log(id)
  
  const deleteFunction = () => {
    dispatch(thunk_deleteSong(id))
    setShowModal(!showModal)
  }
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <div>
                <button onClick={deleteFunction}>Delete</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
        </Modal>
      )}
    </>
  );
}

export default DeleteModal;