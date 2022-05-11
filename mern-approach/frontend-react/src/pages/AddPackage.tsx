import { useState, useRef } from "react";

import AdminTopBar from "../Components/AdminTopBar";
import cssClasses from "./AddPackage.module.css";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4uMDAiLCJyb2xlIjoiYWRtaW4iLCJwb3N0X29mZmljZSI6IlRISUJBUiA5MDIyIiwiaWF0IjoxNjUyMjgxNDQ5LCJleHAiOjE2NTIzMTc0NDl9.1lh7KhdsWxKD7trx6OEy2MGiFI8OKyMbIFjo4fj8gWI";

const AddPackage = () => {
  const [message, setMessage] = useState<{ type: string; text: string }>({ type: "", text: "", });
  const refRfidtag = useRef<HTMLInputElement>(null); // mandatory field
  const refPoids = useRef<HTMLInputElement>(null); // mandatory field
  const refContreRembou = useRef<HTMLInputElement>(null);
  const refNomDest = useRef<HTMLInputElement>(null); // mandatory field
  const refRueDest = useRef<HTMLInputElement>(null);
  const refPostDest = useRef<HTMLInputElement>(null); // mandatory field
  const refVilleDest = useRef<HTMLInputElement>(null);
  const refGouvDest = useRef<HTMLInputElement>(null); // mandatory field
  const refPaysDest = useRef<HTMLInputElement>(null);
  const refServDest = useRef<HTMLInputElement>(null);
  const refPersContDest = useRef<HTMLInputElement>(null);
  const refTelDest = useRef<HTMLInputElement>(null);
  const refAdrDest = useRef<HTMLInputElement>(null);
  const refEmailDest = useRef<HTMLInputElement>(null);
  const refNomExp = useRef<HTMLInputElement>(null); // mandatory field
  const refDepExp = useRef<HTMLInputElement>(null);
  const refRueExp = useRef<HTMLInputElement>(null);
  const refVilleExp = useRef<HTMLInputElement>(null);
  const refPostExp = useRef<HTMLInputElement>(null); // mandatory field
  const refPaysExp = useRef<HTMLInputElement>(null);
  const refTelExp = useRef<HTMLInputElement>(null);
  const refFaxExp = useRef<HTMLInputElement>(null);
  const refPersExp = useRef<HTMLInputElement>(null); // mandatory field
  const refTelPersExp = useRef<HTMLInputElement>(null);
  const refFaxPersExp = useRef<HTMLInputElement>(null);
  const refEmailPersExp = useRef<HTMLInputElement>(null);

  const resetMessageState = (timeOut: number = 3000) => {
    setTimeout(() => { setMessage({ type: "", text: "" }); }, timeOut);
  }

  const onSubmitHandler = async () => {
    // checking mandatory fields
    if (
      refRfidtag.current!.value.length !== 8 ||
      refPoids.current!.value.length === 0 ||
      refNomDest.current!.value.length < 3 ||
      refPostDest.current!.value.length < 3 ||
      refGouvDest.current!.value.length < 3 ||
      refNomExp.current!.value.length < 3 ||
      refPostExp.current!.value.length < 3 ||
      refPersExp.current!.value.length < 3
    ) {
      setMessage({
        type: "danger",
        text: "Il y a un champ obligatoire vide",
      });
      resetMessageState(5000);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}ajouter`,
        {
          method: "POST",
          body: JSON.stringify({
            rfidTag: refRfidtag.current!.value,
            poids: refPoids.current!.value,
            contreRembou: refContreRembou.current!.value,
            nomDest: refNomDest.current!.value,
            rueDest: refRueDest.current!.value,
            postDest: refPostDest.current!.value,
            villeDest: refVilleDest.current!.value,
            gouvDest: refGouvDest.current!.value,
            paysDest: refPaysDest.current!.value,
            servDest: refServDest.current!.value,
            persContDest: refPersContDest.current!.value,
            telDest: refTelDest.current!.value,
            adrDest: refAdrDest.current!.value,
            emailDest: refEmailDest.current!.value,

            nomExp: refNomExp.current!.value,
            depExp: refDepExp.current!.value,
            rueExp: refRueExp.current!.value,
            villeExp: refVilleExp.current!.value,
            postExp: refPostExp.current!.value,
            paysExp: refPaysExp.current!.value,
            telExp: refTelExp.current!.value,
            faxExp: refFaxExp.current!.value,
            persExp: refPersExp.current!.value,
            telPersExp: refTelPersExp.current!.value,
            faxPersExp: refFaxPersExp.current!.value,
            emailPersExp: refEmailPersExp.current!.value,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer "+token
          },
        }
      );
      const data = await response.json();
      if(response.ok) {
        setMessage({
          type: "success",
          text: data.message,
        });
        resetMessageState();
      } else {
        setMessage({
          type: "danger",
          text: data.message,
        });
        resetMessageState(5000);
      }
      console.log(data);
    } catch (error: any) {
      setMessage({
        type: "danger",
        text: error.message,
      });
      resetMessageState(5000);
    }
  };

  return (
    <>
      <AdminTopBar />
      <div className={cssClasses["package-info"]}>
        <label htmlFor="rfidtag">RFID TAG *</label>
        <input
          ref={refRfidtag}
          maxLength={8}
          type="text"
          id="rfidtag"
          className="form-control"
          placeholder="RFID TAG"
        />
        <label htmlFor="poids">Poids (Kg) * </label>
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
          {message.text.length > 0 && (
          <div className={"my-3 alert alert-" + message.type} role="alert">
            {message.text}
          </div>
          )}
          <button
            onClick={onSubmitHandler}
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
