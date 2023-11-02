import { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignUpPage';
import { Icon } from '@iconify/react/dist/iconify.js';

function SignUpModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='bg-green-800 hover:bg-green-900 rounded-md p-2 text-white' onClick={() => setShowModal(true)}>Create Account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <>
                      <div className="flex justify-end p-1">
                      <button onClick={() => setShowModal(false)} className="hover:bg-gray-300 rounded-sm p-2">
                            <Icon icon="octicon:x-12" />
                            </button>
                      </div>
          <div className="flex flex-col justify-between border-b-2 border-gray-200">
                      <h1 className="flex self-center font-semibold text-2xl mb-2">Sign Up</h1>
                      </div>
          <SignupFormPage />
          </>
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;