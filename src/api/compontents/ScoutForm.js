import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { createPost, getSinglePost, updatePost } from '../data/postData';

const initialState = {
  title: '',
  description: '',
  firebaseKey: '',
};

export default function ScoutForm({ user }) {
  const { firebaseKey } = useParams();
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (firebaseKey) {
      getSinglePost(firebaseKey).then((obj) => {
        setFormInput({
          title: obj.title,
          description: obj.description,
          uid: obj.uid,
          firebaseKey: obj.firebaseKey,
        });
      });
    } else {
      setFormInput({ ...initialState, uid: user.uid });
    }
  }, []);

  const history = useHistory();

  const handleTitle = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };

  const handleDescription = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firebaseKey) {
      updatePost(formInput).then(() => {
        resetForm();
        history.push('/scout-talk');
      });
    } else {
      createPost(formInput).then(() => {
        resetForm();
        history.push('/scout-talk');
      });
    }
  };

  return (
    <div className="scout-form">
      <form onSubmit={handleSubmit}>
        <input
          className="search-bar"
          placeholder="Post Title"
          onChange={handleTitle}
          value={formInput.title}
        />
        <input
          className="search-bar"
          placeholder="Post Description"
          onChange={handleDescription}
          value={formInput.description}
        />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}

ScoutForm.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

ScoutForm.defaultProps = {
  user: {},
};
