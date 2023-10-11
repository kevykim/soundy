import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormPage from '../LoginFormPage';

function UploadModal() {
  const [showModal, setShowModal] = useState(false);

  
  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginFormPage />
        </Modal>
      )}
    </>
  );
}

export default UploadModal;