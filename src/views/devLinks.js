import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function DevLinks({ user }) {
  return (
    <>
      {user?.isAdmin ? (
        <div>
          <Link className="dev-links" to="/createProspects">
            Create Prospect
          </Link>
          <br />
          <Link className="dev-links" to="/createTeams">
            Create Team
          </Link>
        </div>
      ) : ('')}
    </>
  );
}

DevLinks.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

DevLinks.defaultProps = {
  user: null,
};
