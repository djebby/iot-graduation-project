import React from 'react';
import {Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AddPackage from "./pages/AddPackage";
import DeletePackage from "./pages/DeletePackage";
import PackageMovment from './pages/PackageMovment';

import './App.css';

const  App: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/colis/:colid" element={<PackageMovment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ajouter" element={<AddPackage />} />
      <Route path="/effacer" element={<DeletePackage />} />
      <Route path="*" element={<h2>404 PAGE NOT FOUND !</h2>} />
    </Routes>
  );
}

export default App;
