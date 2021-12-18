import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createCountdown, getSingleCountdown, updateCountdown } from '../data/farmData';

const initialState = {
  countdownDate: '',
  firebaseKey: '',
};

export default function CountdownForm() {
  const { firebaseKey } = useParams();
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (firebaseKey) {
      getSingleCountdown(firebaseKey).then((obj) => {
        setFormInput({
          countdownDate: obj.countdownDate,
          firebaseKey: obj.firebaseKey,
        });
      });
    } else {
      setFormInput(initialState);
    }
  }, []);

  const history = useHistory();

  const handleDate = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      countdownDate: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firebaseKey) {
      updateCountdown(formInput).then(() => {
        resetForm();
        history.push('/');
      });
    } else {
      createCountdown(formInput).then(() => {
        resetForm();
        history.push('/');
      });
    }
  };

  return (
    <div className="scout-form">
      <form onSubmit={handleSubmit}>
        <input
          className="search-bar"
          placeholder="Countdown Date"
          onChange={handleDate}
          value={formInput.countdownDate}
        />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}
