import axios from 'axios';
import firebase from 'firebase/app';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getCurrentUsersUid = () => firebase.auth().currentUser?.uid;

const getPlayers = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/allProspects.json`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch(reject);
});

const getPitchers = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/allProspects/pitchingProspects.json`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch(reject);
});

const getSystems = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/allTeams.json`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch(reject);
});

const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/allProspects/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const teamsTopProspects = (teamId) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/allProspects.json?orderBy="teamId"&equalTo="${teamId}"`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch(reject);
});

const userWatchesProspect = async (watchedId) => {
  const prospectWatchers = await axios.get(`${baseURL}/watched-prospects.json?orderBy="watchedId"&equalTo="${watchedId}"`).then((response) => Object.values(response.data));
  const uid = getCurrentUsersUid();
  const watched = prospectWatchers.find((prospect) => prospect.uid === uid);
  const returnObj = {
    watchId: watched?.firebaseKey,
    watched: !!watched,
  };
  return returnObj;
};

const getWatchedProspects = async (uid) => {
  const userWatched = await axios.get(`${baseURL}/watched-prospects.json?orderBy="uid"&equalTo="${uid}"`).then((response) => Object.values(response.data)).then((watched) => watched.map((obj) => obj.watchedId));
  const players = await getPlayers();
  const usersWatchedProspect = players.filter((prospect) => userWatched.includes(prospect.firebaseKey));
  return usersWatchedProspect;
};

const watchProspect = (watchedId) => new Promise((resolve, reject) => {
  const uid = getCurrentUsersUid();
  axios.post(`${baseURL}/watched-prospects.json`, {
    watchedId,
    uid,
  })
    .then((response) => {
      const fbKey = { firebaseKey: response.data.name };
      axios.patch(`${baseURL}/watched-prospects/${response.data.name}.json`, fbKey).then(() => resolve({ watchedId }));
    })
    .catch(reject);
});

const unwatchProspect = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/watched-prospects/${firebaseKey}.json`)
    .then(() => getWatchedProspects().then(resolve))
    .catch(reject);
});

const createPlayer = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/allProspects.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${baseURL}/allProspects/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getPlayers().then(resolve);
        });
    })
    .catch(reject);
});

const updatePlayer = (obj) => new Promise((resolve, reject) => {
  axios.patch(`${baseURL}/allProspects/${obj.firebaseKey}.json`, obj)
    .then(() => getPlayers().then(resolve))
    .catch(reject);
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/allTeams/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const updateTeams = (obj) => new Promise((resolve, reject) => {
  axios.patch(`${baseURL}/allTeams/${obj.teamId}.json`, obj).then(() => {
    getSystems().then(resolve);
  }).catch(reject);
});

const createTeam = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/allTeams.json`, obj)
    .then((response) => {
      const teamId = response.data.name;
      axios
        .patch(`${baseURL}/allTeams/${teamId}.json`, { teamId })
        .then(() => {
          getSystems().then(resolve);
        });
    })
    .catch(reject);
});

const deleteTeam = (teamId) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/allTeams/${teamId}.json`)
    .then(() => getSystems().then(resolve))
    .catch(reject);
});

const deleteProspect = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/allProspects/${firebaseKey}.json`)
    .then(() => getPlayers().then(resolve))
    .catch(reject);
});

const getCountdown = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/countdown.json`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
    .catch(reject);
});

const getSingleCountdown = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/countdown/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const updateCountdown = (obj) => new Promise((resolve, reject) => {
  axios.patch(`${baseURL}/countdown/${obj.firebaseKey}.json`, obj)
    .then(() => getCountdown().then(resolve))
    .catch(reject);
});

const createCountdown = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/countdown.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${baseURL}/countdown/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getCountdown().then(resolve);
        });
    })
    .catch(reject);
});

export {
  getPlayers,
  getSystems,
  teamsTopProspects,
  createPlayer,
  getSinglePlayer,
  updatePlayer,
  getSingleTeam,
  updateTeams,
  createTeam,
  deleteProspect,
  getPitchers,
  deleteTeam,
  getWatchedProspects,
  watchProspect,
  unwatchProspect,
  userWatchesProspect,
  getCountdown,
  updateCountdown,
  createCountdown,
  getSingleCountdown,
};
