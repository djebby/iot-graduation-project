import { useState, useEffect } from 'react';
import {Routes, Route, Navigate} from "react-router-dom";

import { AuthContext } from './context/auth-context';
import TrackingInput from './Components/TrackingInput';
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import AddPackage from "./pages/AddPackage";
import DeletePackage from "./pages/DeletePackage";
import PackageMovment from './pages/PackageMovment';

import './App.css';

const  App: React.FC = (): JSX.Element => {
  const [token, setToken] = useState<string>('');
  const [howIsLoggedIn, setHowIsLoggedIn] = useState<string>('');
  const [tokenExpTime, setTokenExpTime] = useState<number | null>(null);

  const login = (token: string, role: string, expirationTime: number) => {
    setHowIsLoggedIn(role);
    setToken('Bearer '+token);
    setTokenExpTime(expirationTime);
    localStorage.setItem('adminData', JSON.stringify({
      role,
      token,
      expirationTime
    }));
  }


  const logout = () => {
    // clear the token value 
    setHowIsLoggedIn('');
    setToken('');
    setTokenExpTime(null);
    localStorage.removeItem('adminData');
  }

  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('adminData') as string);
    if(storedData !== null){
      login(storedData['token'], storedData['role'], storedData['expirationTime'] as number);
    }
  }, []);

  if (tokenExpTime !== null && new Date().getTime() > tokenExpTime!) {
    logout();
  } else if (tokenExpTime !== null) {
    setTimeout(() => {
      logout();
    }, tokenExpTime! - new Date().getTime());
  }
  
  return (
    <AuthContext.Provider value={{howIsLoggedIn,
    token,
    login,
    logout}}>
    <Routes>
      <Route path="/" element={<TrackingInput />} />
      <Route path="/colis/:colid" element={<PackageMovment />} />
      <Route path="/login" element={howIsLoggedIn.length === 0 ? <Login /> : <Navigate to='/' />} />
      <Route path="/dashboard" element={howIsLoggedIn === 'super-admin' ?  <Dashboard /> : <Navigate to='/' />} />
      <Route path="/ajouter" element={ howIsLoggedIn === 'admin' ? <AddPackage /> : <Navigate to='/' /> } />
      <Route path="/effacer" element={ howIsLoggedIn === 'admin' ?  <DeletePackage /> : <Navigate to='/' />} />
      <Route path="*" element={<h2>404 PAGE NOT FOUND !</h2>} />
    </Routes>
    </AuthContext.Provider>
  );
}

export default App;