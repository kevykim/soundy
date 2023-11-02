import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormPage from '../LoginFormPage';
import { Icon } from '@iconify/react/dist/iconify.js';

function UploadModal() {
  const [showModal, setShowModal] = useState(false);

  
  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <>
          <div className="flex justify-end p-1">
                      <button onClick={() => setShowModal(false)} className="hover:bg-gray-300 rounded-sm p-2">
                            <Icon icon="octicon:x-12" />
                            </button>
                      </div>
          <div className="flex flex-col justify-between border-b-2 border-gray-200">
                      <h1 className="flex self-center font-semibold text-2xl mb-2">Sign In</h1>
                      </div>
          <LoginFormPage />
          </>
        </Modal>
      )}
    </>
  );
}

export default UploadModal;