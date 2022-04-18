import React from 'react';
import { useParams } from 'react-router-dom';

const PackageMovment = () => {
  const packageId = useParams().colid;
  return (
    <div>PackageMovment {packageId}</div>
  )
}

export default PackageMovment;