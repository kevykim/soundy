
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './profileButton';
import LoginFormModal from '../LoginModal';

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
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;