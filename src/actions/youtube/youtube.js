import * as ACTION_TYPES from './types';

export const getVideoInformation = url => ({
  types: [
    ACTION_TYPES.GET_VIDEO_INFORMATION_REQUESTED,
    ACTION_TYPES.GET_VIDEO_INFORMATION_SUCCESS,
    ACTION_TYPES.GET_VIDEO_INFORMATION_FAILED
  ],
  payload: {
    client: 'youtube',
    request: {
      method: 'GET',
      url: `/${url}/setWorking` //TODO: COLOCAR PATHDA URL AQUI AQUI
    }
  }
});
