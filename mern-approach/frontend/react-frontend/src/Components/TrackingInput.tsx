import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../images/logo_poste.png";

import cssModules from "./TrackingInput.module.css";

const TrackingInput = () => {
  const tagRef = useRef<HTMLInputElement>(null);
  const [inputValidity, setInputValidity] = useState(true);
  const navigate = useNavigate();

    const tagSubmitionHandler = () => {
      // A3FD5920
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
    <div className={cssModules.tracking}>
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
