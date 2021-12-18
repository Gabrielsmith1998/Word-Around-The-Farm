import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getSingleCountdown } from '../api/data/farmData';
import CountdownForm from '../api/compontents/CountdownForm';

export default function EditCountdownView({ user }) {
  const { firebaseKey } = useParams();
  const [editCountdown, setEditCountdown] = useState({});

  useEffect(() => {
    getSingleCountdown(firebaseKey).then(setEditCountdown);
  }, []);

  return (
    <>
      {user?.isAdmin ? (
        <div className="form-container">
          <h1 className="page-header">Edit Countdown</h1>
          <CountdownForm user={editCountdown} />
        </div>
      ) : ('')}
    </>
  );
}

EditCountdownView.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

EditCountdownView.defaultProps = {
  user: null,
};
