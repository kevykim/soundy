import { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignUpPage';

function SignUpModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='bg-green-800 hover:bg-green-900 rounded-md p-2 text-white' onClick={() => setShowModal(true)}>Create Account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;