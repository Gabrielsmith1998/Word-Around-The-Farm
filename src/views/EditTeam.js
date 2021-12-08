import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleTeam } from '../api/data/farmData';
import TeamForm from '../api/compontents/TeamForm';

export default function EditTeam() {
  const { teamId } = useParams();
  const [editTeam, setEditTeam] = useState({});

  useEffect(() => {
    getSingleTeam(teamId).then(setEditTeam);
  }, []);

  return (
    <>
      <h1 className="page-header">Edit Teams</h1>
      <div className="form-container">
        <TeamForm user={editTeam} />
      </div>
    </>
  );
}
