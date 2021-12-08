import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  createTeam,
  getSingleTeam,
  updateTeams,
} from '../data/farmData';

const initialState = {
  name: '',
  systemRanking: '',
  teamId: '',
  location: '',
};

export default function TeamForm() {
  const { teamId } = useParams();
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (teamId) {
      getSingleTeam(teamId).then((obj) => {
        setFormInput({
          name: obj.name,
          location: obj.location,
          teamId: obj.teamId,
          systemRanking: obj.systemRanking,
        });
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
        resetForm();
        history.push('/');
      });
    } else {
      createTeam(formInput).then(() => {
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
          value={formInput.location}
        />
        <input
          className="search-bar"
          placeholder="Teams Name"
          onChange={handleChange}
          value={formInput.name}
        />
        <select
          className="dropDown"
          category="category"
          typeof="text"
          onChange={handleSystemRanking}
          value={formInput.systemRanking}
        >
          <option disabled selected defaultValue="System Ranking">
            System Ranking
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
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
        </select>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}
