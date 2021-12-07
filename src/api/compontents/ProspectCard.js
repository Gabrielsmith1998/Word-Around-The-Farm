import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'reactstrap';

export default function ProspectCards({ allProspects }) {
  const [details, setDetails] = useState(false);
  const showDetails = () => {
    setDetails(!details);
  };
  return (
    <div>
      <Container className="prospect-card-container">
        <Card className="prospect-cards">
          <p>{allProspects.name}</p>
          <li>{allProspects.leagueRanking}</li>
          <button onClick={showDetails} type="button">Player Grades</button>
          {details && (
            <div className="details-modal">
              <h5>testing</h5>
              <h5>Testing</h5>
              <button onClick={showDetails} type="button">
                Close
              </button>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
}

ProspectCards.propTypes = {
  allProspects: PropTypes.shape(PropTypes.obj).isRequired,
};
