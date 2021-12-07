import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSinglePlayer } from '../api/data/farmData';
import PlayerForm from '../api/compontents/PlayerForm';

export default function EditProspect() {
  const { firebaseKey } = useParams();
  const [editProspect, setEditProspect] = useState({});

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditProspect);
  }, []);

  return (
    <>
      <h1 className="page-header">Edit Prospects</h1>
      <div className="form-container">
        <PlayerForm user={editProspect} />
      </div>
    </>
  );
}
