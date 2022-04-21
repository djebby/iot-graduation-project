import React from 'react';
import { useParams } from 'react-router-dom';

import TrackingInput from '../Components/TrackingInput';


//this data should fetched from the backend !!!! GET /:packageId
const DUMMY_MOVMENT: any[] = [
  {date: "2020-06-19 15:43:40", pays: "Tunisia", lieu: "Agence Rapid-Poste Ariana", type: "Recevoir les envois du client (Otb)", info: ""},
  {date: "2020-06-19 16:09:57", pays: "Tunisia", lieu: "Agence Rapid-Poste Ariana", type: "Envoyer vers le prochain point de traitement (Otb)", info: ""},
  {date: "2020-06-19 17:31:13", pays: "Tunisia", lieu: "TUNIS CARTHAGE RAPID POST EMS", type: "Reception des envois au Centre de traitement (Otb et National)", info: ""},
  {date: "2020-06-19 20:30:00", pays: "Tunisia", lieu: "TUNIS CARTHAGE RAPID POST EMS", type: "Envoyer vers le prochain point de traitement (Inb)", info: ""},
  {date: "2020-06-20 07:55:12", pays: "Tunisia", lieu: "Centre de distribution Beja", type: "Envoyer vers le prochain point de traitement (Inb)", info: ""},
  {date: "2020-06-20 08:36:00", pays: "Tunisia", lieu: "THIBAR", type: "Recevoir envoi au bureau de livraison (Inb)", info: ""},
];

const PackageMovment = () => {
  const packageId = useParams().colid;
  return (
    <div>
      <TrackingInput />
      {
        DUMMY_MOVMENT.length > 0 ?
        <>
        <h2>PackageMovment {packageId}</h2>
        <table className='table'>
            <thead className='table-dark'>
            <tr><th>date</th><th>Pays</th><th>Lieu</th><th>type d'evenment</th><th>Autres Informations</th></tr>
            </thead>
            <tbody>
            {
              DUMMY_MOVMENT.map(mov => (
                <tr key={mov.date}>
                  <td>{mov.date}</td>
                  <td>{mov.pays}</td>
                  <td>{mov.lieu}</td>
                  <td>{mov.type}</td>
                  <td>{mov.info}</td>
                </tr>
              ))
            }
            </tbody>
        </table>
        </>
        :
        <h3>Veuillez vérifier l'identifiant saisi {packageId} </h3>
      }
    </div>
  )
}

export default PackageMovment;