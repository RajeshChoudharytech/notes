import axiosInstance from '../utils/axiosInstance';
import apiUrl from '../utils/apiUrls';

// Login function
export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(apiUrl.LOGIN, credentials);
  return response.data;
};

//Register function
export const registerUser = async (userData) => {
  const response = await axiosInstance.post(apiUrl.REGISTER, userData);
  return response.data;
};

export const fetchNotes = async () => {
  const response = await axiosInstance.get(apiUrl.GET_NOTES);
  return response.data;
};

export const addNote = async (note) => {
  const response = await axiosInstance.post(apiUrl.ADD_NOTES,note);
  return response.data;
};

export const deleteNote = async (noteId) => {
  const response = await axiosInstance.delete(apiUrl.DELETE_NOTES(noteId));
  return response;
};


export const updateNote = async (noteId, updatedData) => {
  const response = await axiosInstance.put(apiUrl.EDIT_NOTES(noteId), updatedData); 
  return response;
};
export const createAudioRecording = async (audioData) => {

  const response = await axiosInstance.post(apiUrl.AUDIO_RECORDINGS, audioData);
  return response;
};

