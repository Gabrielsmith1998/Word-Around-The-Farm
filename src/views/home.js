import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProspectCards from '../api/compontents/ProspectCard';
import TeamCards from '../api/compontents/TeamCards';
import { getCountdown, getPlayers, getSystems } from '../api/data/farmData';
import Countdown from './Countdown';

export default function Home({ user }) {
  const [countdownDates, setCountdowndates] = useState([]);
  const [prospects, setProspects] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getPlayers().then((allProspects) => {
        setProspects(allProspects);
      });
    }
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

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getCountdown().then((dates) => {
        setCountdowndates(dates);
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const sorted = prospects.sort((a, b) => a.leagueRanking - b.leagueRanking);
  const leagueRanked = sorted.filter(
    (allProspects) => allProspects.leagueRanking <= 10 && allProspects.leagueRanking >= 1,
  );

  const sortedSystems = teams.sort((a, b) => a.systemRanking - b.systemRanking);
  const systemRanked = sortedSystems.filter(
    (allTeams) => allTeams.systemRanking <= 10,
  );

  return (
    <div className="prospect-div">
      {countdownDates ? (
        <>
          {countdownDates.map((dates) => (
            <Countdown dates={dates} key={dates.firebaseKey} user={user} />
          ))}
        </>
      ) : (
        ''
      )}
      {prospects ? (
        <>
          <div>
            <h1 className="top-10-prospect">Top 10 Prospects</h1>
            <div className="d-flex flex-wrap">
              {leagueRanked.map((prospect) => (
                <ProspectCards
                  key={prospect.firebaseKey}
                  prospect={prospect}
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
      <div className="team-div">
        {teams ? (
          <>
            <h1 className="top-10-farm">Top 10 Farm Systems</h1>
            <Link className="full-rankings" to="/full-rankings">
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
