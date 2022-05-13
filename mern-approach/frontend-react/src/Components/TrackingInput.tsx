import { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import logo from "../images/logo_poste.png";

import cssClasses from "./TrackingInput.module.css";

const TrackingInput = () => {
  const tagRef = useRef<HTMLInputElement>(null);
  const [inputValidity, setInputValidity] = useState(true);
  const [whereToGo, setWhereToGo] = useState<string>('/login');
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  
  useEffect(
    ()=>{
      if(authCtx.howIsLoggedIn === 'admin')
        setWhereToGo('/ajouter');
      if(authCtx.howIsLoggedIn === 'super-admin')
        setWhereToGo('/dashboard');
    }
);
  
  

  const tagSubmitionHandler = () => {
    if(tagRef.current!.value.length !== 8){
        console.log("Please enter a valid tag");
        setInputValidity(false);
        setTimeout(()=>{
          setInputValidity(true);
        }, 1000)
        return;
    }
    console.log(tagRef.current!.value);
    navigate("/colis/"+tagRef.current!.value);
  }

  return (
    <div className={cssClasses.tracking}>
      <Link className={cssClasses.link} to={whereToGo}><button className="btn btn-primary">
        { authCtx.howIsLoggedIn.length > 0 ? 'Dashboard' :  'Administrateurs ?'}
      </button></Link>
      <img src={logo} alt="poste logo" width="150" />
      <h3>Suivez vos envois Rapid-Poste</h3>
      <label htmlFor="tag" className="form-label">
        Numéro de l'envoi :
      </label>
    
      <input
        id="tag"
        type="text"
        className={`form-control my-3 ${!inputValidity ? "is-invalid" : ""}`}
        ref={tagRef}
        placeholder="numéro du suivi"
        maxLength={8}
      />
      <button className="btn btn-success" onClick={tagSubmitionHandler}>Valider</button>
    </div>
  );
};

export default TrackingInput;
