import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProspectCards from '../api/compontents/ProspectCard';
import { teamsTopProspects } from '../api/data/farmData';

export default function TopFiveProspects() {
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
      {prospect ? (
        <>
          {prospectRanked.map((allProspects) => (
            <ProspectCards
              key={allProspects.firebaseKey}
              setProspects={setProspects}
              allProspects={allProspects}
            />
          ))}
        </>
      ) : (
        ''
      )}
    </>
  );
}
