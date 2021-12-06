import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'reactstrap';

export default function ProspectCards({ allProspects }) {
  return (
    <div>
      <Container className="prospect-card-container">
        <Card className="prospect-cards">
          <p>{allProspects.name}</p>
          <li>{allProspects.leagueRanking}</li>
        </Card>
      </Container>
    </div>
  );
}

ProspectCards.propTypes = {
  allProspects: PropTypes.shape(PropTypes.obj).isRequired,
};
