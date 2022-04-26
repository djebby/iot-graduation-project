import {useState, useEffect} from 'react';
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
  const [movement, setMovement] = useState<any[]>([]);
  useEffect(()=>{
    const fetchPackageMovementHistory = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${packageId}`);
        const data = await response.json();
        setMovement(data);
      } catch (error) {
        
      }
      
    }
    fetchPackageMovementHistory();
  }, [packageId]);

  return (
    <div>
      <TrackingInput />
      {
        movement.length > 0 ?
        <>
        <div className="alert alert-info my-3" role="alert">
          historique des mouvements de colis : {packageId}
        </div>
      
        <table className='table'>
            <thead className='table-dark'>
            <tr><th>date</th><th>Pays</th><th>Lieu</th><th>type d'evenment</th><th>Autres Informations</th></tr>
            </thead>
            <tbody>
            {
              movement.map(mov => (
                <tr key={mov.date}>
                  <td>{mov.date}</td>
                  <td>{mov.pays}</td>
                  <td>{mov.lieu}</td>
                  <td>{mov.type_even}</td>
                  <td>{mov.autres_info}</td>
                </tr>
              ))
            }
            </tbody>
        </table>
        </>
        :
        <div className="alert alert-warning my-3" role="alert">
          Veuillez vérifier l'identifiant saisi : {packageId}
        </div>
        
      }
    </div>
  )
}

export default PackageMovment;