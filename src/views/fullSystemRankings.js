import React, { useEffect, useState } from 'react';
import AllTeamCards from '../api/compontents/AllTeamCards';
import { getSystems } from '../api/data/farmData';

export default function FullSystemRankings() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getSystems().then((allTeams) => {
      if (isMounted) setTeams(allTeams);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const sortedSystems = teams.sort((a, b) => a.systemRanking - b.systemRanking);
  const systemRanked = sortedSystems.filter(
    (allTeams) => allTeams.systemRanking <= 30,
  );

  return (
    <div>
      {teams ? (
        <>
          <h1 className="text-center">Full System Rankings</h1>
          <div className="d-flex flex-wrap">
            {systemRanked.map((allTeams) => (
              <AllTeamCards
                key={allTeams.teamId}
                allTeams={allTeams}
                setTeams={setTeams}
              />
            ))}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
