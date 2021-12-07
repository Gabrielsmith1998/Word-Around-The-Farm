import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'reactstrap';

export default function TeamCards({ allTeams }) {
  return (
    <div>
      <Container className="team-card-container">
        <Card className="team-cards">
          <p>{allTeams.location} {allTeams.name}</p>
          <li>{allTeams.systemRanking}</li>
        </Card>
      </Container>
    </div>
  );
}

TeamCards.propTypes = {
  allTeams: PropTypes.shape(PropTypes.obj).isRequired,
};
