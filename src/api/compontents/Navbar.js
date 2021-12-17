import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavLink,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { signInUser, signOutUser } from '../auth';

export default function Navagation({ user }) {
  const history = useHistory();

  const handleSignOut = () => {
    signOutUser().then(() => history.push('/'));
  };

  return (
    <div className="farm-navbar">
      <Navbar>
        <NavLink
          className="navFarmLink"
          href="/"
        >
          Home
        </NavLink>
        {user?.isAdmin ? (
          <NavLink
            className="navFarmLink"
            href="/devPortal"
          >
            Dev Portal
          </NavLink>
        ) : (
          ''
        )}
        {user ? (
          <>
            <NavLink
              className="navFarmLink"
              href={`/watched-prospects/${user.uid}`}
            >
              My Watched Prospects
            </NavLink>
            <NavLink
              className="navFarmLink"
              href="/scout-talk"
            >
              Scout Talk
            </NavLink>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleSignOut}
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
  user: null,
};
