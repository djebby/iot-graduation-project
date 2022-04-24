import React from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../images/logo_poste.png";
import cssClasses from "./AdminTopBar.module.css";

const AdminTopBar = () => {
  const location = useLocation();

  return (
    <nav className={cssClasses.nav}>
      <img src={logo} width="75" alt="logo" />
      <div>
        <Link to={location.pathname === '/ajouter' ? '/effacer' : '/ajouter'}>
          <button className={location.pathname === '/ajouter' ? "btn btn-danger mx-2": "btn btn-success mx-2"}> 
            {location.pathname === '/ajouter' ? 'Effacer un colis' : 'Ajouter un colis'} 
          </button>
        </Link>
        <button className="btn btn-warning mx-3">Déconnecter</button>
      </div>
    </nav>
  );
};

export default AdminTopBar;
