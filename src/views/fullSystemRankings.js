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

  const sortedSystems = teams.sort(
    (a, b) => a.systemRankings - b.systemRankings,
  );
  return (
    <div>
      {teams ? (
        <>
          <h1 className="text-center">Full System Rankings</h1>
          <div className="d-flex flex-wrap">
            {sortedSystems.map((allTeams) => (
              <AllTeamCards
                key={allTeams.firebaseKey}
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
