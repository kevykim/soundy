
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './profileButton';
import LoginFormModal from '../LoginModal';
import SignUpModal from '../SignUpModal.ts';
import UploadModal from '../LoginModal/upload.tsx';

type UserType = {
    username : string
    email : string
}

type stateType = {
    session : {
        user : UserType
    }
}

interface NavigationProps {
    isLoaded: boolean;
}

function Navigation({ isLoaded } : NavigationProps){
  const sessionUser = useSelector((state : stateType) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='flex flex-row justify-between w-20'>
       <NavLink to='/upload' className='flex flex-col justify-center'>Upload</NavLink>
        <ProfileButton user={sessionUser} />
      </div>

    );
  } else {
    sessionLinks = (
      <div className='flex flex-row justify-between w-60'>
        <LoginFormModal />
        <SignUpModal />
        {!sessionUser ? <UploadModal /> : <NavLink to='/upload' className='flex flex-col justify-center'>upload</NavLink>}
        
      </div>
    );
  }

  return (
    <div className=' bg-black p-5' >
      <div className=' text-white flex flex-row justify-between '>
        <NavLink className='p-2' to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;