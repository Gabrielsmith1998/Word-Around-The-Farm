import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function ProspectCards({ allProspects, user }) {
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
          {user?.isAdmin && (
            <Link
              to={`/edit/${allProspects.firebaseKey}`}
              className="btn btn-success"
            >
              <i className="far fa-edit" /> Edit
            </Link>
          )}
          <button onClick={showDetails} type="button">
            Player Grades
          </button>
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
  user: PropTypes.shape(PropTypes.obj),
  allProspects: PropTypes.shape(PropTypes.obj).isRequired,
};

ProspectCards.defaultProps = {
  user: {},
};
