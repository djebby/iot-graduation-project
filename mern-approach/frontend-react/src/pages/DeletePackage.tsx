import {useRef} from 'react';

import AdminTopBar from '../Components/AdminTopBar';
import cssClasses from './DeletePackage.module.css';

const DeletePackage = () => {
  const refRfidTag = useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    console.log(refRfidTag.current!.value);
  }
  
  return (
    <>
    <AdminTopBar />
    <div className={cssClasses['delete-input']}>
       <label htmlFor="rfid-tag">
         <h5>
          RFID TAG * 
         </h5>
       </label>
        <input
          ref={refRfidTag}
          type="text"
          id="rfid-tag"
          className="form-control"
          placeholder="RFID TAG"
          maxLength={8}
        />
      <button onClick={submitHandler} className="btn btn-danger">Effacer un colis</button>
    </div>
    </>
  )
}

export default DeletePackage;