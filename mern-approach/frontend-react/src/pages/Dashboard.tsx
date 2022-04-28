import { useRef, useState } from "react";

import getPassword from "../util/generateRandomPassword";
import cssClasses from "./Dashboard.module.css";

const Dashboard = () => {
  const [passwordVisibility, setPasswordVisibility] =
    useState<string>("password");

  const refNewAdminName = useRef<HTMLInputElement>(null);
  const refRegisteredAdminName = useRef<HTMLInputElement>(null);
  const refAdminPassword = useRef<HTMLInputElement>(null);

  const refCountry = useRef<HTMLInputElement>(null);
  const refPlace = useRef<HTMLInputElement>(null);
  const refEventType = useRef<HTMLInputElement>(null);
  const refOtherInfo = useRef<HTMLInputElement>(null);

  const generateUniqueNameHandler = () => {
    refNewAdminName.current!.value = "admin." + new Date().getTime();
  };

  const generateRandomPasswordHandler = () => {
    refAdminPassword.current!.value = getPassword(25);
    setPasswordVisibility("text");
  };

  const onAddAdminHandler = () => {
    // will send post request to the backend
    console.log("admin : ", refNewAdminName.current!.value);
    console.log("password : ", refAdminPassword.current!.value);
  };

  const onDeleteRegisteredAdminHandler = () => {
    // will send delete request to the backend
    console.log("delete => " + refRegisteredAdminName.current!.value);
  };

  const onCreateTokenHandler = () => {
    // will send post request to the backend
    console.log("generate a new jwt for esp8266...");
  };

  return (
    <div className={cssClasses.dashboard}>
      <div className={cssClasses.token}>
        <label htmlFor="pays">pays: </label>
        <input
          ref={refCountry}
          type="text"
          id="pays"
          className="form-control my-1"
          placeholder="pays"
        />
        <label htmlFor="lieu">lieu:</label>
        <input
          ref={refPlace}
          type="text"
          id="lieu"
          className="form-control my-1"
          placeholder="lieu"
        />
        <label htmlFor="registered-admin-name">type d'événement:</label>
        <input
          ref={refEventType}
          type="event-type"
          id="event-type"
          className="form-control my-1"
          placeholder="type d'événement"
        />
        <label htmlFor="other-info">autre information</label>
        <input
          ref={refOtherInfo}
          type="text"
          id="other-info"
          className="form-control my-1"
          placeholder="autre information"
        />
        <button
          onClick={onCreateTokenHandler}
          type="button"
          className="btn btn-success my-4"
        >
          générer un jeton
        </button>
      </div>
      <div className={cssClasses.admin}>
        <label htmlFor="admin-name">Nom de l'administrateur: </label>
        <div className="input-group mb-3">
          <input
            ref={refNewAdminName}
            type="text"
            id="admin-name"
            className="form-control"
            placeholder="admin name"
          />
          <button
            onClick={generateUniqueNameHandler}
            type="button"
            className="btn btn-dark"
          >
            générer
          </button>
        </div>
        <label htmlFor="admin-password">
          Mot de passe de l'administrateur:
        </label>
        <div className="input-group mb-3">
          <input
            ref={refAdminPassword}
            type={passwordVisibility}
            id="admin-password"
            className="form-control"
            placeholder="admin password"
          />
          <button
            onClick={generateRandomPasswordHandler}
            type="button"
            className="btn btn-dark"
          >
            générer
          </button>
        </div>
        <button
          onClick={onAddAdminHandler}
          type="button"
          className="btn btn-success"
        >
          Ajouter un nouveau admin
        </button>
        <hr />
        <label htmlFor="registered-admin-name">Registered admin name: </label>
        <input
          ref={refRegisteredAdminName}
          type="text"
          id="registered-admin-name"
          className="form-control my-3"
          placeholder="registered admin name"
        />
        <button
          onClick={onDeleteRegisteredAdminHandler}
          type="button"
          className="btn btn-danger"
        >
          Effacer un admin
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
