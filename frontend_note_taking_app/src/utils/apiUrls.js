const API_BASE = '/api';

const apiUrls = {
  LOGIN: `${API_BASE}/token/`,
  REFRESH_TOKEN: `${API_BASE}/token/refresh/`,
  REGISTER: `${API_BASE}/users/`,
  GET_NOTES: `${API_BASE}/notes/`,
  ADD_NOTES:`${API_BASE}/notes/`,
  AUDIO_RECORDINGS: `${API_BASE}/audio-recordings/`,
  DELETE_NOTES: (id) => `${API_BASE}/notes/${id}/`,
  EDIT_NOTES: (id) => `${API_BASE}/notes/${id}/`,
  
}

export default apiUrls;