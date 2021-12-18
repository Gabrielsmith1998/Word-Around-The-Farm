import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import ProspectCards from '../api/compontents/ProspectCard';
import { teamsTopProspects } from '../api/data/farmData';

export default function TopFiveProspects({ user }) {
  const [prospect, setProspects] = useState([]);
  const { teamId } = useParams();

  useEffect(() => {
    teamsTopProspects(teamId).then(setProspects);
  });

  const sortedProspects = prospect.sort((a, b) => a.orgRanking - b.orgRanking);
  const prospectRanked = sortedProspects.filter(
    (allProspects) => allProspects.orgRanking <= 5,
  );

  return (
    <>
      <h1 className="top-5-header">Top Five Prospects</h1>
      <div className="prospect-div">
        {prospect ? (
          <>
            <Link className="full-rankings" to="/full-rankings">
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
      </div>
    </>
  );
}

TopFiveProspects.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

TopFiveProspects.defaultProps = {
  user: null,
};
