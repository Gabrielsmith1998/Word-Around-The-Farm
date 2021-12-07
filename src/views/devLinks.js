import React from 'react';
import { Link } from 'react-router-dom';

export default function DevLinks() {
  return (
    <div>
      <Link className="nav-link active" to="/createProspects">
        Create Prospect
      </Link>
      <Link className="nav-link active" to="/createTeams">
        Create Team
      </Link>
    </div>
  );
}
