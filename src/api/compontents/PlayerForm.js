import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import {
  createPlayer,
  getPlayers,
  getSinglePlayer,
  getSystems,
  updatePlayer,
} from '../data/farmData';

const initialState = {
  name: '',
  leagueRanking: '',
  orgRanking: '',
  teamId: '',
};

export default function PlayerForm({ setProspects }) {
  const { teamId } = useParams();
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (teamId) {
      getSinglePlayer(teamId).then(() => {
        setFormInput(teamId);
      });
    } else {
      setFormInput(initialState);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    getSystems().then((allTeams) => {
      if (isMounted) setTeams(allTeams);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const history = useHistory();

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const handleOrgRanking = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      orgRanking: Number(e.target.value),
    }));
  };

  const handleTeam = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      teamId: e.target.value,
    }));
  };

  const handleLeagueRanking = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      leagueRanking: Number(e.target.value),
    }));
  };

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamId) {
      updatePlayer(formInput).then(() => {
        getPlayers().then(setProspects);
        resetForm();
        history.push('/');
      });
    } else {
      createPlayer(formInput).then(() => {
        getPlayers().then(setProspects);
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
          placeholder="Players Name"
          onChange={handleChange}
        />
        <select
          className="dropDown"
          category="category"
          value={formInput.orgRanking}
          typeof="text"
          onChange={handleOrgRanking}
          required
        >
          <option disabled="disabled" value="">Org Ranking</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <select
          className="dropDown"
          category="category"
          value={formInput.teamId}
          typeof="text"
          onChange={handleTeam}
          required
        > <option disabled="disabled" value="">Select Team</option> {teams ? (
          teams.map((allTeams) => (
            <option key={allTeams.teamId} value={allTeams.teamId}>{allTeams.name}</option>
          ))
        ) : (
          ''
        )}
        </select>
        <select
          onChange={handleLeagueRanking}
          type="number"
          name="leagueRanking"
          value={formInput.leagueRanking}
        >
          <option disabled="disabled" value="">League Ranking</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <button className="btn btn-success" type="submit">
          {teamId ? 'UPDATE' : 'SUBMIT'}
        </button>
      </form>
    </div>
  );
}

PlayerForm.propTypes = {
  setProspects: PropTypes.func.isRequired,
};
