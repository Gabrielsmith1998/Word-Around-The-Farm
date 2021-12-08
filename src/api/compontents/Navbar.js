import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { signInUser, signOutUser } from '../auth';

export default function Navagation({ user }) {
  const history = useHistory();

  return (
    <div className="routes">
      <Navbar>
        <button
          className="btn btn-light"
          type="button"
          onClick={() => history.push('/')}
        >
          Home
        </button>
        {user?.isAdmin && (
          <button
            className="btn btn-info"
            type="button"
            onClick={() => history.push('/devPortal')}
          >
            Dev Portal
          </button>
        )}
        {user ? (
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.push(`/watched-prospects/${user.uid}`)}
            >
              My Watched Prospects
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={signOutUser}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-success"
            onClick={signInUser}
          >
            Sign In
          </button>
        )}
      </Navbar>
    </div>
  );
}

Navagation.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Navagation.defaultProps = {
  user: {},
};
