import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import ProspectCards from '../api/compontents/ProspectCard';
import { teamsTopProspects } from '../api/data/farmData';

export default function TopFiveProspects({ user }) {
  const [prospects, setProspects] = useState([]);
  const { teamId } = useParams();

  useEffect(() => {
    teamsTopProspects(teamId).then(setProspects);
  });

  const sortedProspects = prospects.sort((a, b) => a.orgRanking - b.orgRanking);
  const prospectRanked = sortedProspects.filter(
    (allProspects) => allProspects.orgRanking <= 5,
  );

  return (
    <>
      <h1 className="top-5-header">Top Five Prospects</h1>
      <div className="prospect-div">
        {prospects ? (
          <>
            <Link className="full-rankings" to="/full-rankings">
              Back
            </Link>
            <>
              {prospectRanked.map((prospect) => (
                <div>
                  <h5>{prospect.orgRanking}.</h5>
                  <ProspectCards
                    key={prospect.firebaseKey}
                    setProspect={setProspects}
                    prospect={prospect}
                    user={user}
                  />
                </div>
              ))}
            </>
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
