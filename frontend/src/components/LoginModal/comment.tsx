import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormPage from '../LoginFormPage';

function CommentModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Sign in to comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginFormPage />
        </Modal>
      )}
    </>
  );
}

export default CommentModal;