import './index.css'

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import * as sessionActions from "./store/session";


import LoginFormPage from './components/LoginFormPage';
import HomePage from './components/HomePage';

function App() {

  const dispatch : any = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return isLoaded && (
     <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path="/login" element={<LoginFormPage />} />
     </Routes>

  );
}

export default App;