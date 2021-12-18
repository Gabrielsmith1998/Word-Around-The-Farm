import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  createPlayer,
  getSinglePlayer,
  getSystems,
  updatePlayer,
} from '../data/farmData';

const initialState = {
  firebaseKey: '',
  name: '',
  leagueRanking: '',
  orgRanking: '',
  teamId: '',
  position: '',
  veloGrade: '',
  powerGrade: '',
  controlGrade: '',
  offSpeedGrade: '',
  contactGrade: '',
  speedGrade: '',
  fieldingGrade: '',
};

export default function PlayerForm() {
  const { teamId, firebaseKey } = useParams();
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (firebaseKey) {
      if (isMounted) {
        getSinglePlayer(firebaseKey).then((obj) => {
          setFormInput({
            name: obj.name,
            leagueRanking: obj.leagueRanking,
            orgRanking: obj.orgRanking,
            teamId: obj.teamId,
            position: obj.position,
            veloGrade: obj.veloGrade,
            powerGrade: obj.powerGrade,
            controlGrade: obj.controlGrade,
            offSpeedGrade: obj.offSpeedGrade,
            contactGrade: obj.contactGrade,
            speedGrade: obj.speedGrade,
            fieldingGrade: obj.fieldingGrade,
            firebaseKey: obj.firebaseKey,
          });
        });
      }
    }
    return () => {
      isMounted = false;
    };
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

  const handlePosition = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      position: e.target.value,
    }));
  };

  const handleVeloGrade = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      veloGrade: e.target.value,
    }));
  };

  const handleOffSpeedGrade = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      offSpeedGrade: e.target.value,
    }));
  };

  const handleControlGrade = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      controlGrade: e.target.value,
    }));
  };

  const handlePowerGrade = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      powerGrade: e.target.value,
    }));
  };

  const handleContactGrade = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      contactGrade: e.target.value,
    }));
  };

  const handleFieldingGrade = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      fieldingGrade: e.target.value,
    }));
  };

  const handleSpeedGrade = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      speedGrade: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firebaseKey) {
      updatePlayer(formInput).then(() => {
        resetForm();
        history.push('/');
      });
    } else {
      createPlayer(formInput).then(() => {
        resetForm();
        history.push('/');
      });
    }
  };

  return (
    <div className="prospect-form">
      <form onSubmit={handleSubmit}>
        <input
          className="search-bar"
          placeholder="Players Name"
          onChange={handleChange}
          value={formInput.name}
        />
        <select
          className="dropDown"
          category="category"
          value={formInput.position}
          typeof="text"
          onChange={handlePosition}
          required
        >
          <option disabled="disabled" value="">
            Position
          </option>
          <option value="Pitcher">Pitcher</option>
          <option value="Catcher">Cather</option>
          <option value="1st Base">1st Base</option>
          <option value="2nd Base">2nd Base</option>
          <option value="Shortstop">Shortstop</option>
          <option value="3rd Base">3rd Base</option>
          <option value="Left Field">Left Field</option>
          <option value="Center Field">Center Field</option>
          <option value="Right Field">Right Field</option>
        </select>
        <select
          className="dropDown"
          category="category"
          value={formInput.orgRanking}
          typeof="text"
          onChange={handleOrgRanking}
          required
        >
          <option disabled="disabled" value="">
            Org Ranking
          </option>
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
        >
          {' '}
          <option disabled="disabled" value="">
            Select Team
          </option>{' '}
          {teams
            ? teams.map((allTeams) => (
              <option key={allTeams.teamId} value={allTeams.teamId}>
                {allTeams.name}
              </option>
            ))
            : ''}
        </select>
        <select
          onChange={handleLeagueRanking}
          type="number"
          name="leagueRanking"
          value={formInput.leagueRanking}
        >
          <option disabled="disabled" value="">
            League Ranking
          </option>
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
        {formInput.position === 'Pitcher' ? (
          <>
            <select
              className="dropDown"
              category="category"
              value={formInput.veloGrade}
              typeof="text"
              onChange={handleVeloGrade}
              required
            >
              <option disabled="disabled" value="">
                Velo Grade
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
            <select
              className="dropDown"
              category="category"
              value={formInput.offSpeedGrade}
              typeof="text"
              onChange={handleOffSpeedGrade}
              required
            >
              <option disabled="disabled" value="">
                OffSpeed Grade
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
            <select
              className="dropDown"
              category="category"
              value={formInput.controlGrade}
              typeof="text"
              onChange={handleControlGrade}
              required
            >
              <option disabled="disabled" value="">
                Control Grade
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </>
        ) : (
          <>
            {' '}
            <select
              className="dropDown"
              category="category"
              value={formInput.powerGrade}
              typeof="text"
              onChange={handlePowerGrade}
              required
            >
              <option disabled="disabled" value="">
                Power Grade
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
            <select
              className="dropDown"
              category="category"
              value={formInput.contactGrade}
              typeof="text"
              onChange={handleContactGrade}
              required
            >
              <option disabled="disabled" value="">
                Contact Grade
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
            <select
              className="dropDown"
              category="category"
              value={formInput.fieldingGrade}
              typeof="text"
              onChange={handleFieldingGrade}
              required
            >
              <option disabled="disabled" value="">
                Fielding Grade
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
            <select
              className="dropDown"
              category="category"
              value={formInput.speedGrade}
              typeof="text"
              onChange={handleSpeedGrade}
              required
            >
              <option disabled="disabled" value="">
                Speed Grade
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </>
        )}
        <button className="btn btn-success" type="submit">
          {teamId ? 'UPDATE' : 'SUBMIT'}
        </button>
      </form>
    </div>
  );
}
