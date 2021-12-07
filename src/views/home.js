import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProspectCards from '../api/compontents/ProspectCard';
import TeamCards from '../api/compontents/TeamCards';
import { getPlayers, getSystems } from '../api/data/farmData';

export default function Home({ user }) {
  const [prospect, setProspects] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getPlayers().then((allProspects) => {
      if (isMounted) setProspects(allProspects);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    getSystems().then((allTeams) => {
      if (isMounted) setTeams(allTeams);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const sorted = prospect.sort((a, b) => a.leagueRanking - b.leagueRanking);
  const leagueRanked = sorted.filter(
    (allProspects) => allProspects.leagueRanking <= 10 && allProspects.leagueRanking >= 1,
  );

  const sortedSystems = teams.sort((a, b) => a.systemRanking - b.systemRanking);
  const systemRanked = sortedSystems.filter(
    (allTeams) => allTeams.systemRanking <= 10,
  );

  return (
    <div>
      {prospect ? (
        <>
          <div>
            <h1 className="text-center">Top 10 Prospects</h1>
            <div className="d-flex flex-wrap">
              {leagueRanked.map((allProspects) => (
                <ProspectCards
                  key={allProspects.firebaseKey}
                  allProspects={allProspects}
                  setProspects={setProspects}
                  user={user}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        ''
      )}
      <div>
        {teams ? (
          <>
            <h1 className="text-center">Top 10 Farm Systems</h1>
            <Link className="nav-link active" to="/full-rankings">
              Full Rankings
            </Link>
            <div className="d-flex flex-wrap">
              {systemRanked.map((allTeams) => (
                <TeamCards
                  key={allTeams.teamId}
                  allTeams={allTeams}
                  setTeams={setTeams}
                  user={user}
                />
              ))}
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

Home.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Home.defaultProps = {
  user: null,
};
