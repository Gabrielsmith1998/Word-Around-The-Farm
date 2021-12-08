import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import ProspectCards from '../api/compontents/ProspectCard';
import { getWatchedProspects } from '../api/data/farmData';

export default function WatchedProspect({ user }) {
  const [prospect, setProspects] = useState([]);
  const { uid } = useParams();

  useEffect(() => {
    getWatchedProspects(uid).then(setProspects);
  });

  const sortedProspects = prospect.sort((a, b) => a.orgRanking - b.orgRanking);
  const prospectRanked = sortedProspects.filter(
    (allProspects) => allProspects.orgRanking <= 5,
  );

  return (
    <>
      {prospect ? (
        <>
          <Link
            className="nav-link active"
            to="/full-rankings"
          >
            Back
          </Link>
          {prospectRanked.map((allProspects) => (
            <ProspectCards
              key={allProspects.firebaseKey}
              setProspects={setProspects}
              allProspects={allProspects}
              user={user}
            />
          ))}
        </>
      ) : (
        ''
      )}
    </>
  );
}

WatchedProspect.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

WatchedProspect.defaultProps = {
  user: null,
};
