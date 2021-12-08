import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  deleteProspect,
  watchProspect,
} from '../data/farmData';

export default function ProspectCards({ allProspects, user, setProspects }) {
  const [details, setDetails] = useState(false);
  const showDetails = () => {
    setDetails(!details);
  };

  const handleDelete = () => {
    deleteProspect(allProspects.firebaseKey).then((prospects) => setProspects(prospects));
  };

  const handleWatch = () => {
    watchProspect(allProspects.firebaseKey);
  };

  return (
    <div>
      <Container className="prospect-card-container">
        <Card className="prospect-cards">
          <p>{allProspects.name}</p>
          <li>{allProspects.leagueRanking}</li>
          {user && (
            <div>
              <button type="button" onClick={handleWatch}>
                Watch Prospects
              </button>
            </div>
          )}
          {user?.isAdmin && (
            <Link
              to={`/edit/${allProspects.firebaseKey}`}
              className="btn btn-success"
            >
              <i className="far fa-edit" /> Edit
            </Link>
          )}
          {user?.isAdmin && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <i className="far fa-edit" /> Delete
            </button>
          )}
          <button onClick={showDetails} type="button">
            Player Grades
          </button>
          {details && (
            <div className="details-modal">
              {allProspects.position === 'Pitcher' ? (
                <div>
                  <h5>Pitching Grades</h5>
                  <p>Velo: {allProspects.veloGrade}</p>
                  <p>Control: {allProspects.controlGrade}</p>
                  <p>Offspeed: {allProspects.offSpeedGrade}</p>
                </div>
              ) : (
                <div>
                  <h5>Position Grades</h5>
                  <p>Power: {allProspects.powerGrade}</p>
                  <p>Contact: {allProspects.contactGrade}</p>
                  <p>Speed: {allProspects.speedGrade}</p>
                  <p>Fielding: {allProspects.fieldingGrade}</p>
                </div>
              )}
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
  setProspects: PropTypes.func.isRequired,
  allProspects: PropTypes.shape(PropTypes.obj).isRequired,
};

ProspectCards.defaultProps = {
  user: {},
};
