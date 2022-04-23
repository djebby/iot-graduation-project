import { useRef } from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo_poste.png";
import cssClasses from "./AddPackage.module.css";

const AddPackage = () => {
  const refRfidtag = useRef<HTMLInputElement>(null);
  const refPoids = useRef<HTMLInputElement>(null);
  const refContreRembou = useRef<HTMLInputElement>(null);
  const refNomDest = useRef<HTMLInputElement>(null);
  const refRueDest = useRef<HTMLInputElement>(null);
  const refPostDest = useRef<HTMLInputElement>(null);
  const refVilleDest = useRef<HTMLInputElement>(null);
  const refGouvDest = useRef<HTMLInputElement>(null);
  const refPaysDest = useRef<HTMLInputElement>(null);
  const refServDest = useRef<HTMLInputElement>(null);
  const refPersContDest = useRef<HTMLInputElement>(null);
  const refTelDest = useRef<HTMLInputElement>(null);
  const refAdrDest = useRef<HTMLInputElement>(null);
  const refEmailDest = useRef<HTMLInputElement>(null);
  const refNomExp = useRef<HTMLInputElement>(null);
  const refDepExp = useRef<HTMLInputElement>(null);
  const refRueExp = useRef<HTMLInputElement>(null);
  const refVilleExp = useRef<HTMLInputElement>(null);
  const refPostExp = useRef<HTMLInputElement>(null);
  const refPaysExp = useRef<HTMLInputElement>(null);
  const refTelExp = useRef<HTMLInputElement>(null);
  const refFaxExp = useRef<HTMLInputElement>(null);
  const refPersExp = useRef<HTMLInputElement>(null);
  const refTelPersExp = useRef<HTMLInputElement>(null);
  const refFaxPersExp = useRef<HTMLInputElement>(null);
  const refEmailPersExp = useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    // checking and sending the http POST Request to the backend : /ajouter
  };

  return (
    <>
      <nav className={cssClasses.nav}>
        <img src={logo} width="75" alt="logo" />
        <div>
          <Link to="/effacer">
            <button className="btn btn-danger mx-2">Effacer un colis</button>
          </Link>
          <button className="btn btn-warning">Déconnecter</button>
        </div>
      </nav>

      <div className={cssClasses["package-info"]}>
        <label htmlFor="rfidtag">RFID TAG *</label>
        <input
          ref={refRfidtag}
          type="text"
          id="rfidtag"
          className="form-control"
          placeholder="RFID TAG"
        />
        <label htmlFor="poids">Poids (Kg): </label>
        <input
          ref={refPoids}
          type="text"
          id="poids"
          className="form-control"
          placeholder="POIDS KG"
        />
        <label htmlFor="contreRembou">
          Numéro de compte (pour l'offre Contre Remboursement) :
        </label>
        <input
          ref={refContreRembou}
          type="text"
          id="contreRembou"
          className="form-control"
          placeholder="Numéro de compte"
        />
      </div>
      <div className={cssClasses["package-details"]}>
        <div className={cssClasses["dist-exp"]}>
          <h4> Destinataire : </h4>
          <label htmlFor="nomDest">Nom/Raison sociale * : </label>
          <input
            ref={refNomDest}
            type="text"
            className="form-control"
            id="nomDest"
          />
          <label htmlFor="rueDest">Rue et N° :</label>
          <input
            ref={refRueDest}
            type="text"
            className="form-control"
            id="rueDest"
          />
          <label htmlFor="postDest">Code postal * :</label>
          <input
            ref={refPostDest}
            type="text"
            className="form-control"
            id="postDest"
          />
          <label htmlFor="villeDest">Ville :</label>
          <input
            ref={refVilleDest}
            type="text"
            className="form-control"
            id="villeDest"
          />
          <label htmlFor="gouvDest">Gouvernorat * : </label>
          <input
            ref={refGouvDest}
            type="text"
            className="form-control"
            id="gouvDest"
          />
          <label htmlFor="paysDest">Pays :</label>
          <input
            ref={refPaysDest}
            type="text"
            className="form-control"
            id="paysDest"
          />
          <label htmlFor="servDest">Service destination :</label>
          <input
            ref={refServDest}
            type="text"
            className="form-control"
            id="servDest"
          />
          <label htmlFor="persContDest">Personne de contact :</label>
          <input
            ref={refPersContDest}
            type="text"
            className="form-control"
            id="persContDest"
          />
          <label htmlFor="telDest">Tel contact : </label>
          <input
            ref={refTelDest}
            type="text"
            className="form-control"
            id="telDest"
          />
          <label htmlFor="adrDest">adresse contact : </label>
          <input
            ref={refAdrDest}
            type="text"
            className="form-control"
            id="adrDest"
          />
          <label htmlFor="emailDest">E-mail contact :</label>
          <input
            ref={refEmailDest}
            type="text"
            className="form-control"
            id="emailDest"
          />
        </div>

        <div className={cssClasses["dist-exp"]}>
          <h4> Expéditeur : </h4>

          <label htmlFor="nomExp"> Nom/Raison sociale * :</label>
          <input
            ref={refNomExp}
            type="text"
            className="form-control"
            id="nomExp"
          />

          <label htmlFor="depExp">Département :</label>
          <input
            ref={refDepExp}
            type="text"
            className="form-control"
            id="depExp"
          />

          <label htmlFor="rueExp">Rue et N° :</label>
          <input
            ref={refRueExp}
            type="text"
            className="form-control"
            id="rueExp"
          />

          <label htmlFor="villeExp"> Ville : </label>
          <input
            ref={refVilleExp}
            type="text"
            className="form-control"
            id="villeExp"
          />

          <label htmlFor="postExp"> Code postal * : </label>
          <input
            ref={refPostExp}
            type="text"
            className="form-control"
            id="postExp"
          />

          <label htmlFor="paysExp">Pays :</label>
          <input
            ref={refPaysExp}
            type="text"
            className="form-control"
            id="paysExp"
          />

          <label htmlFor="telExp">Tel :</label>
          <input
            ref={refTelExp}
            type="text"
            className="form-control"
            id="telExp"
          />

          <label htmlFor="faxExp">Fax :</label>
          <input
            ref={refFaxExp}
            type="text"
            className="form-control"
            id="faxExp"
          />

          <label htmlFor="persExp">Personne de contact *:</label>
          <input
            ref={refPersExp}
            type="text"
            className="form-control"
            id="persExp"
          />

          <label htmlFor="telPersExp"> Tel contact : </label>
          <input
            ref={refTelPersExp}
            type="text"
            className="form-control"
            id="telPersExp"
          />

          <label htmlFor="faxPersExp">Fax contact : </label>
          <input
            ref={refFaxPersExp}
            type="text"
            className="form-control"
            id="faxPersExp"
          />

          <label htmlFor="emailPersExp">E-mail contact :</label>
          <input
            ref={refEmailPersExp}
            type="text"
            className="form-control"
            id="emailPersExp"
          />
          <button
            onClick={submitHandler}
            className="btn btn-success btn-lg my-3"
          >
            ajouter
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPackage;
