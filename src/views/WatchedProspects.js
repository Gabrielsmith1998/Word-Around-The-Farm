import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ProspectCards from '../api/compontents/ProspectCard';
import { getWatchedProspects } from '../api/data/farmData';

export default function WatchedProspect({ user }) {
  const [prospect, setProspects] = useState([]);
  const { uid } = useParams();

  useEffect(() => {
    let isMounted = true;
    getWatchedProspects(uid).then((allProspects) => {
      if (isMounted) setProspects(allProspects);
    });
    return () => {
      isMounted = false;
    };
  });

  const sortedProspects = prospect.sort((a, b) => a.orgRanking - b.orgRanking);
  const prospectRanked = sortedProspects.filter(
    (allProspects) => allProspects.orgRanking <= 5,
  );

  return (
    <>
      <h1 className="watched-header">My Watched Prospects</h1>
      <div className="prospect-div">
        {prospect ? (
          <>
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
      </div>
    </>
  );
}

WatchedProspect.propTypes = {
  user: PropTypes.oneOfType([PropTypes.shape(PropTypes.obj)]),
};

WatchedProspect.defaultProps = {
  user: null,
};
