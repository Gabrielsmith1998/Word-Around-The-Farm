import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { deleteTeam } from '../data/farmData';

export default function TeamCards({ allTeams, user, setTeams }) {
  const handleDelete = () => {
    deleteTeam(allTeams.teamId).then((teams) => setTeams(teams));
  };

  return (
    <div>
      <Container className="team-card-container">
        <Card className="team-cards">
          <p>
            {allTeams.location} {allTeams.name}
          </p>
          <li>{allTeams.systemRanking}</li>
          {user?.isAdmin ? (
            <Link to={`/editTeams/${allTeams.teamId}`} className="btn btn-success">
              <i className="far fa-edit" /> Edit
            </Link>
          ) : ('')}
          {user?.isAdmin ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <i className="far fa-edit" /> Delete
            </button>
          ) : ('')}
        </Card>
      </Container>
    </div>
  );
}

TeamCards.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
  setTeams: PropTypes.func.isRequired,
  allTeams: PropTypes.shape(PropTypes.obj).isRequired,
};

TeamCards.defaultProps = {
  user: {},
};
