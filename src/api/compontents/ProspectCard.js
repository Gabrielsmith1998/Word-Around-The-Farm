import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  deleteProspect,
  unwatchProspect,
  userWatchesProspect,
  watchProspect,
} from '../data/farmData';

export default function ProspectCards({ prospect, user, setProspects }) {
  const [details, setDetails] = useState(false);
  const [watchedInfo, setWatchedInfo] = useState(false);
  const showDetails = () => {
    setDetails(!details);
  };

  const getWatchInfo = () => {
    userWatchesProspect(prospect.firebaseKey).then((watched) => setWatchedInfo(watched));
  };

  const handleDelete = () => {
    deleteProspect(prospect.firebaseKey).then((prospects) => setProspects(prospects));
  };

  const handleWatch = () => {
    if (watchedInfo.watched) {
      unwatchProspect(watchedInfo.watchId).then(() => {
        getWatchInfo();
      });
    } else {
      watchProspect(prospect.firebaseKey).then(() => {
        getWatchInfo();
      });
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (prospect.firebaseKey) {
      if (isMounted) getWatchInfo();
    }
    return () => {
      isMounted = false;
    };
  }, [watchedInfo]);

  return (
    <div className="prospect-div">
      <Container className="prospect-card-container">
        <Card className="prospect-cards">
          <p>{prospect.name}</p>
          <p>{prospect.position}</p>
          {prospect?.leagueRanking ? (
            <p>League Ranking {prospect.leagueRanking}</p>
          ) : (
            ''
          )}
          {user ? (
            <div>
              <button type="button" onClick={handleWatch}>
                {watchedInfo.watched ? 'Watched' : 'Watch Prospect'}
              </button>
            </div>
          ) : (
            ''
          )}
          {user?.isAdmin ? (
            <Link
              to={`/edit/${prospect.firebaseKey}`}
              className="btn btn-success"
            >
              <i className="far fa-edit" /> Edit
            </Link>
          ) : (
            ''
          )}
          {user?.isAdmin ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <i className="far fa-edit" /> Delete
            </button>
          ) : (
            ''
          )}
          <button onClick={showDetails} type="button">
            Player Grades
          </button>
          {details ? (
            <div className="details-modal">
              {prospect.position === 'Pitcher' ? (
                <div>
                  <h5>Pitching Grades</h5>
                  <p>Velo: {prospect.veloGrade}</p>
                  <p>Control: {prospect.controlGrade}</p>
                  <p>Offspeed: {prospect.offSpeedGrade}</p>
                </div>
              ) : (
                <div>
                  <h5>Position Grades</h5>
                  <p>Power: {prospect.powerGrade}</p>
                  <p>Contact: {prospect.contactGrade}</p>
                  <p>Speed: {prospect.speedGrade}</p>
                  <p>Fielding: {prospect.fieldingGrade}</p>
                </div>
              )}
              <button onClick={showDetails} type="button">
                Close
              </button>
            </div>
          ) : (
            ''
          )}
        </Card>
      </Container>
    </div>
  );
}

ProspectCards.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
  setProspects: PropTypes.func.isRequired,
  prospect: PropTypes.shape(PropTypes.obj).isRequired,
};

ProspectCards.defaultProps = {
  user: {},
};
