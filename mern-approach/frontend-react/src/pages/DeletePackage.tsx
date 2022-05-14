import { useState, useRef, useContext } from "react";

import { AuthContext } from "../context/auth-context";
import AdminTopBar from "../Components/AdminTopBar";
import cssClasses from "./DeletePackage.module.css";


const DeletePackage = () => {
  const [message, setMessage] = useState<{ type: string; text: string }>({
    type: "",
    text: "",
  });
  const refRfidTag = useRef<HTMLInputElement>(null);
  const authCtx = useContext(AuthContext);

  const resetMessageState = (timeOut: number = 3000) => {
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, timeOut);
  }

  const submitHandler = async () => {
    if (refRfidTag.current!.value.length !== 8) {
      setMessage({
        type: "danger",
        text: "entrer un reference correct (8 Caractère)",
      });
      resetMessageState();
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/package/${
          refRfidTag.current!.value
        }`,
        {
          method: "DELETE",
          headers: { Authorization: authCtx.token }, // Of course the value of the token will come later from redux (this is just for temporary testing)
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage({ type: "success", text: data.message });
        resetMessageState();
      } else {
        setMessage({ type: "danger", text: data.message });
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 3000);
      }
    } catch (error: any) {
      setMessage({ type: "danger", text: error.message });
      resetMessageState();
    }
  };

  return (
    <>
      <AdminTopBar />
      <div className={cssClasses["delete-input"]}>
        <label htmlFor="rfid-tag">
          <h5>RFID TAG *</h5>
        </label>
        <input
          ref={refRfidTag}
          type="text"
          id="rfid-tag"
          className="form-control my-3"
          placeholder="RFID TAG"
          maxLength={8}
        />
        <button onClick={submitHandler} className="btn btn-danger">
          Effacer un colis
        </button>
        {message.text.length > 0 && (
          <div className={"my-3 alert alert-" + message.type} role="alert">
            {message.text}
          </div>
        )}
      </div>
    </>
  );
};

export default DeletePackage;