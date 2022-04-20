import {useRef} from "react";
import { useNavigate } from "react-router-dom";

import logo from "../images/logo_poste.png";
import cssClasses from "./Login.module.css";
const Login = () => {
  const adminRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const loginHandler = () => {
    console.log(adminRef.current!.value);
    console.log(passwordRef.current!.value);
    navigate("/ajouter"); // successful login case
  }

  return (
    <div className={`${cssClasses.container} container`}>
      <img src={logo} alt="poste logo" width="150" />
    

      <div className="row my-5">
        <div className="col-2">
        <label htmlFor="adminname">Admin Name</label>
        </div>
        <div className="col-10">
        <input
        ref={adminRef}
          type="text"
          className="form-control col-6"
          id="adminname"
          name="user"
          placeholder="Administrateur"
        />
        </div>
      </div>


      <div className="row">
        <div className="col-2">
        <label htmlFor="password">
          Mot de passe
        </label>
        </div>
        <div className="col-10">
        <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="password"
            placeholder="mot de passe"
          />
        </div>
      </div>

      <button onClick={loginHandler} className="btn btn-primary my-5">Connexion</button>
     
    </div>
  );
};

export default Login;
