import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getSinglePost } from '../api/data/postData';
import ScoutForm from '../api/compontents/ScoutForm';

export default function EditPost({ user }) {
  const { firebaseKey } = useParams();
  const [editPost, setEditPost] = useState({});

  useEffect(() => {
    getSinglePost(firebaseKey).then(setEditPost);
  }, []);

  return (
    <>
      {user ? (
        <div className="form-container">
          <h1 className="page-header">Edit Prospects</h1>
          <ScoutForm user={editPost} />
        </div>
      ) : ('')}
    </>
  );
}

EditPost.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

EditPost.defaultProps = {
  user: null,
};
