import {useState, useRef} from "react";
import { useNavigate } from "react-router-dom";

import logo from "../images/logo_poste.png";
import cssClasses from "./Login.module.css";
const Login = () => {
  const adminRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const resetErrorMessageState = (timeOut: number = 3000) => {
    setTimeout(() => {
      setErrorMessage("");
    }, timeOut);
  }

  const loginHandler = async () => {

    if(adminRef.current!.value.length < 4 || passwordRef.current!.value.length < 4) {
      setErrorMessage("nom d'administrateur ou mot de passe invalide");
      resetErrorMessageState();
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: adminRef.current!.value,
          password: passwordRef.current!.value,
        })
      });

      const data = await response.json();
      if(response.ok){
        if(data.role === 'admin')
          navigate("/ajouter");
        else if (data.role === 'super-admin')
          navigate("/dashboard");
      } else {
        setErrorMessage(data.message);
        resetErrorMessageState();
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      resetErrorMessageState();
    }

    
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
      
      { errorMessage.length > 0 && <div className="my-3 alert alert-danger" role="alert"> {errorMessage} </div> }

      <button onClick={loginHandler} className="btn btn-primary my-5">Connexion</button>
     
    </div>
  );
};

export default Login;
