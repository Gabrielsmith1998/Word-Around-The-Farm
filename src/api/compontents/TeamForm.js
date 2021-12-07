import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import {
  createTeam,
  getSingleTeam,
  getSystems,
  updateTeams,
} from '../data/farmData';

const initialState = {
  name: '',
  systemRanking: '',
  teamId: '',
  location: '',
};

export default function TeamForm({ setTeams }) {
  const { teamId } = useParams();
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (teamId) {
      getSingleTeam(teamId).then(() => {
        setFormInput(teamId);
      });
    } else {
      setFormInput(initialState);
    }
  }, []);

  const history = useHistory();

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const handleLocation = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      location: e.target.value,
    }));
  };

  const handleSystemRanking = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      systemRanking: Number(e.target.value),
    }));
  };

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamId) {
      updateTeams(formInput).then(() => {
        getSystems().then(setTeams);
        resetForm();
        history.push('/');
      });
    } else {
      createTeam(formInput).then(() => {
        getSystems().then(setTeams);
        resetForm();
        history.push('/');
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="search-bar"
          placeholder="Teams Location"
          onChange={handleLocation}
        />
        <input
          className="search-bar"
          placeholder="Teams Name"
          onChange={handleChange}
        />
        <select
          className="dropDown"
          category="category"
          typeof="text"
          onChange={handleSystemRanking}
        > <option disabled="disabled" value="">System Ranking</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}

TeamForm.propTypes = {
  setTeams: PropTypes.func.isRequired,
};
