import axios from 'axios/index';
import { YOUTUBE } from '../constants/Apis';

function createClient(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    transformResponse: [
      data => {
        return JSON.parse(data);
      }
    ]
  });
}

const clients = {
  youtube: {
    client: createClient(YOUTUBE)
  }
};

export default clients;
