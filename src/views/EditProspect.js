import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getSinglePlayer } from '../api/data/farmData';
import PlayerForm from '../api/compontents/PlayerForm';

export default function EditProspect({ user }) {
  const { firebaseKey } = useParams();
  const [editProspect, setEditProspect] = useState({});

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditProspect);
  }, []);

  return (
    <>
      {user?.isAdmin && (
        <div className="form-container">
          <h1 className="page-header">Edit Prospects</h1>
          <PlayerForm user={editProspect} />
        </div>
      )}
    </>
  );
}

EditProspect.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

EditProspect.defaultProps = {
  user: null,
};
