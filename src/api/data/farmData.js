import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getPlayers = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/allProspects.json`)
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

const teamsTopProspects = (teamId) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/allProspects.json?orderBy="teamId"&equalTo="${teamId}"`)
    .then((response) => {
      resolve(Object.values(response.data));
    })
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

const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/allProspects/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
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
  axios.patch(`${baseURL}/allTeams/${obj.firebaseKey}.json`, obj).then(() => {
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
};
