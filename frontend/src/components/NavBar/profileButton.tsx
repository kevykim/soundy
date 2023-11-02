import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";

interface User {
    username : string
    email : string
}

function ProfileButton({ user } : {user : User}) {
  const dispatch : any = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => {
    document.removeEventListener("click", closeMenu);
    }
  }, [showMenu]);

  const logout = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="flex relative group">
      <button onClick={openMenu}>

        {user.profileImg ? <img className="ml-2" src={user.profileImg}></img> : <i className="fas fa-user-circle" />}
      </button>
      {showMenu && (
        <div className="flex flex-col absolute top-14 right-[-1rem] w-32 bg-white text-black border border-gray-400 space-y-2 text-sm font-bold">
          <NavLink to={`/artists/${user.username}`} className="hover:bg-slate-100 text-center p-2">Profile</NavLink>
            <button style={{ margin: 0 }} className="hover:bg-slate-100 text-center p-2" onClick={logout}>Sign out</button>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;