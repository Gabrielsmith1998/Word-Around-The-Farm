import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Container } from 'reactstrap';
import { deletePost } from '../data/postData';

export default function ScoutCards({ allPosts, user, setPosts }) {
  const handleDelete = () => {
    deletePost(allPosts.firebaseKey).then((posts) => setPosts(posts));
  };

  return (
    <div className="scout-div">
      {user ? (
        <Container className="scout-card-container">
          <Card className="scout-cards">
            <h5>{allPosts.title}</h5>
            <p>{allPosts.description}</p>

            {user.uid === allPosts.uid ? (
              <>
                {' '}
                <Link
                  to={`/edit-post/${allPosts.firebaseKey}`}
                  className="btn btn-success"
                >
                  <i className="far fa-edit" /> Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  <i className="far fa-edit" /> Delete
                </button>
              </>
            ) : ('')}
          </Card>
        </Container>
      ) : ('')}
    </div>
  );
}

ScoutCards.propTypes = {
  setPosts: PropTypes.func.isRequired,
  allPosts: PropTypes.shape(PropTypes.obj).isRequired,
  user: PropTypes.shape(PropTypes.obj),
};

ScoutCards.defaultProps = {
  user: null,
};
