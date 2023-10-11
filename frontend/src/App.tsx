import './index.css'

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import * as sessionActions from "./store/session";


import LoginFormPage from './components/LoginFormPage';
import HomePage from './components/HomePage';
import SignupFormPage from './components/SignUpPage';
import Navigation from './components/NavBar/navbar';
import SongsDetail from './components/SongsDetail';
import UploadSong from './components/UploadSong';

function App() {

  const dispatch : any = useDispatch();
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
    <Navigation isLoaded={isLoaded} />
     
     {isLoaded && (<Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path="/login" element={<LoginFormPage />} />
        <Route path='/signup' element={<SignupFormPage />} />
        <Route path='/songs/:id' element={<SongsDetail />} />
        <Route path='/upload' element={<UploadSong />} />
     </Routes>
     )}    
    </>

  );
}

export default App;