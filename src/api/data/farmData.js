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

export { getPlayers, getSystems };
