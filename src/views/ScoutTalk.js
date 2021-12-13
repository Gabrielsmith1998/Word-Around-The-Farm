import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getScoutPosts } from '../api/data/postData';
import ScoutCards from '../api/compontents/ScoutCards';

export default function ScoutTalk({ user }) {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const { uid } = useParams();

  useEffect(() => {
    let isMounted = true;
    getScoutPosts(uid).then((allPosts) => {
      if (isMounted) setPosts(allPosts);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      {posts ? (
        <>
          <h1 className="text-center">Scout Talk</h1>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push(`/scout-form/${user.uid}`)}
          >
            Add Post
          </button>
          <div className="d-flex flex-wrap">
            {posts.map((allPosts) => (
              <ScoutCards
                key={allPosts.firebaseKey}
                allPosts={allPosts}
                setPosts={setPosts}
                user={user}
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

ScoutTalk.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

ScoutTalk.defaultProps = {
  user: {},
};
