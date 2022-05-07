import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import TrackingInput from '../Components/TrackingInput';


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