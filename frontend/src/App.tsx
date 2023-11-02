import './index.css'

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import * as sessionActions from "./store/session";


import LoginFormPage from './components/LoginFormPage';
import HomePage from './components/HomePage';
import SignupFormPage from './components/SignUpPage';
import Navigation from './components/NavBar/navbar';
import SongsDetail from './components/Songs/SongsDetail';
import UploadSong from './components/Songs/UploadSong';
import EditTracks from './components/Songs/EditTracks';
import Footer from './components/Footer';
import ArtistPage from './components/Artist/ArtistPage';
import ArtistTracks from './components/Artist/ArtistTracks';
import ArtistAlbums from './components/Artist/ArtistAlbums';
import ArtistPlaylists from './components/Artist/ArtistPlaylists';

function App() {

  const dispatch : any = useDispatch();
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <div className='flex flex-col h-screen justify-between'>
      <div>
    <Navigation isLoaded={isLoaded} />
     
     {isLoaded && (<Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path="/login" element={<LoginFormPage />} />
        <Route path='/signup' element={<SignupFormPage />} />
        <Route path='/songs/:id' element={<SongsDetail />} />
        <Route path='/upload' element={<UploadSong />} />
        <Route path='/songs/:id/edit' element={<EditTracks />}/>
        <Route path='/artists/:username' element={<ArtistPage />} />
        <Route path='/artists/:username/tracks' element={<ArtistTracks />} />
        <Route path='/artists/:username/albums' element={<ArtistAlbums />} />
        <Route path='/artists/:username/playlists' element={<ArtistPlaylists />}/>
     </Routes>
     )}    
      </div>
      <div>
     <Footer />
      </div>
    </div>

  );
}

export default App;