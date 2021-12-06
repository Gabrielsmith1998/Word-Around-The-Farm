import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function AllTeamCards({ allTeams }) {
  return (
    <div>
      <Container className="team-card-container">
        <Card className="team-cards">
          <Link className="nav-link active" to="/top-5-prospects">
            Top 5 Prospects
          </Link>
          <p>{allTeams.location}</p>
          <p>{allTeams.name}</p>
          <li>{allTeams.systemRanking}</li>
        </Card>
      </Container>
    </div>
  );
}

AllTeamCards.propTypes = {
  allTeams: PropTypes.shape(PropTypes.obj).isRequired,
};
