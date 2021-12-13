import axios from 'axios';
// import firebase from 'firebase/app';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

// const getCurrentUsersUid = () => firebase.auth().currentUser?.uid;

const getScoutPosts = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/scout-talk.json`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch(reject);
});

const createPost = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/scout-talk.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${baseURL}/scout-talk/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getScoutPosts().then(resolve);
        });
    })
    .catch(reject);
});

const updatePost = (obj) => new Promise((resolve, reject) => {
  axios.patch(`${baseURL}/scout-talk/${obj.firebaseKey}.json`, obj)
    .then(() => getScoutPosts().then(resolve))
    .catch(reject);
});

const deletePost = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/scout-talk/${firebaseKey}.json`)
    .then(() => getScoutPosts().then(resolve))
    .catch(reject);
});

const getSinglePost = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/scout-talk/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  getScoutPosts,
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
};
