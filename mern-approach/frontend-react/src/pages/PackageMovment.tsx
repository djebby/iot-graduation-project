import React from 'react';
import { useParams } from 'react-router-dom';

import TrackingInput from '../Components/TrackingInput';

const PackageMovment = () => {
  const packageId = useParams().colid;
  return (
    <div>
      
      <TrackingInput />
      <h2>PackageMovment {packageId}</h2>
    
    </div>
  )
}

export default PackageMovment;