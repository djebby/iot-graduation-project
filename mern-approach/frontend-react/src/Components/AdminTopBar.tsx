import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import logo from "../images/logo_poste.png";
import cssClasses from "./AdminTopBar.module.css";

const AdminTopBar = () => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  }

  return (
    <nav className={cssClasses.nav}>
      <Link to='/'>
        <img src={logo} width="75" alt="logo" />
      </Link>
      <div>
        {
        authCtx.howIsLoggedIn === 'admin' &&  <Link to={location.pathname === '/ajouter' ? '/effacer' : '/ajouter'}>
          <button className={location.pathname === '/ajouter' ? "btn btn-danger mx-2": "btn btn-success mx-2"}> 
            {location.pathname === '/ajouter' ? 'Effacer un colis' : 'Ajouter un colis'} 
          </button>
        </Link>}
        <button className="btn btn-warning mx-3" onClick={logoutHandler}>Déconnecter</button>
      </div>
    </nav>
  );
};

export default AdminTopBar;
