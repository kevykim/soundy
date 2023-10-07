
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './profileButton';
import LoginFormModal from '../LoginModal';
import SignUpModal from '../SignUpModal.ts';

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
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='flex flex-row justify-between w-48'>
        <LoginFormModal />
        <SignUpModal />
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