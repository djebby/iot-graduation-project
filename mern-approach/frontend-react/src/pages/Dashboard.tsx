import { useEffect, useRef, useState,  } from "react";

import ResponseBox from "../Components/ResponseBox";
import getPassword from "../util/generateRandomPassword";
import cssClasses from "./Dashboard.module.css";


const Dashboard = () => {
  const [passwordVisibility, setPasswordVisibility] = useState<string>("password");
  const [responseBoxVisibility, setResponseBoxVisibility] = useState<boolean>(false);
  const [rfidReaderJWT, setRfidReaderJWT] = useState<string>("");
  const [onAddAdminResponse, setOnAddAdminResponse] = useState<{ label: string; value: string }[]>([]);
  const [ responseTypeAndMessage, setResponseTypeAndMessage ] = useState<{ type: string; message: string }>({ type: "", message: "" });


  const refNewAdminName = useRef<HTMLInputElement>(null);
  const refNewAdminOffice = useRef<HTMLInputElement>(null);
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

  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3VwZXIuYWRtaW4uMDAiLCJyb2xlIjoic3VwZXItYWRtaW4iLCJwb3N0X29mZmljZSI6IkNFTlRSQUwgQURNSU5JU1RSQVRJT04iLCJpYXQiOjE2NTIwMDI3MDcsImV4cCI6MTY1MjAzODcwN30.-B-HUXueIZz4nBHxULGza7pzhsD4sUeUIJXaWRpOL4A";

  const onAddAdminHandler = async () => {
    // will send post request to the backend
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            // "Authorization": "Bearer the.token.that.will.be.stored.with.redux..."
          },
          body: JSON.stringify({
            name: refNewAdminName.current!.value,
            post_office: refNewAdminOffice.current!.value,
            password: refAdminPassword.current!.value,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {

        setOnAddAdminResponse([
          {
            label: "admin name :",
            value: data.adminName,
          },
          {
            label: "admin password :",
            value: data.adminPassword,
          },
          {
            label: "admin office :",
            value: data.post_office,
          },
        ]);
        setResponseTypeAndMessage({
          type: "success",
          message: data.message,
        });
      } else {
        setResponseTypeAndMessage({
          type: "error",
          message: data.message,
        });
      }
      

      console.log(response.ok, data);
    } catch (error: any) {
      setResponseTypeAndMessage({
        type: "error",
        message: error.message,
      });
      console.log(error);
    } finally {
      setResponseBoxVisibility(true);
    }
  };

  const onDeleteRegisteredAdminHandler = async () => {
    setOnAddAdminResponse([]);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}auth/${
          refRegisteredAdminName.current!.value
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();

      if(response.ok){
        setResponseTypeAndMessage({type: "success", message: data.message});
      } else {
        setResponseTypeAndMessage({type: "error", message: data.message});
      }

    } catch (error: any) {
      setResponseTypeAndMessage({type: "error", message: error.message});
    }
    finally {
      setResponseBoxVisibility(true);
    }
    console.log("delete => " + refRegisteredAdminName.current!.value);
  };

  const onCreateTokenHandler = async () => {
    // will send post request to the backend
    console.log("generate a new jwt for esp8266...");
    console.log();
    console.log();
    console.log();
    console.log();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}auth/create-rfid-token`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          Authorization  : "Bearer " + token,
        },
        body: JSON.stringify({
          pays : refCountry.current!.value,
          lieu : refPlace.current!.value,
          type_even : refEventType.current!.value,
          autres_info : refOtherInfo.current!.value
        })
      });
      const data = await response.json();
      if(response.ok){
        setRfidReaderJWT(data.token);
      } else {
        setRfidReaderJWT("there is an error occured!");
      }
    } catch (error) {
      setRfidReaderJWT("there is an error occured!");
    }
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
        <hr />
        <div className="form-floating">
          <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={rfidReaderJWT} readOnly style={{height: "180px"}} ></textarea>
          <label htmlFor="floatingTextarea">The json web token : </label>
        </div>
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

        <label htmlFor="post-office">Lieu</label>
        <input
          type="text"
          id="post-office"
          ref={refNewAdminOffice}
          placeholder="Nom et numéro du bureau de poste"
          className="form-control"
        />

        <button
          onClick={onAddAdminHandler}
          type="button"
          className="btn btn-success my-3"
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
        <hr />
        {responseBoxVisibility && (
          <ResponseBox
            type={responseTypeAndMessage.type}
            message={responseTypeAndMessage.message}
            data = {onAddAdminResponse}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
