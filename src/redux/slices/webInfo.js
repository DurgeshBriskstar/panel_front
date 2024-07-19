import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  webInfo: null,
  isLoading: false,
};

const slice = createSlice({
  name: 'webInfo',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // RESET LOADER
    resetLoader(state) {
      state.isLoading = false;
    },

    // GET CATEGORIES
    getWebInfoSuccess(state, action) {
      state.isLoading = false;
      state.webInfo = action.payload;
    }
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getWebInfo(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post('/api/web/get', data);
      if (response.status) {
        dispatch(slice.actions.getWebInfoSuccess(response?.data?.web));
        return Promise.resolve(response);
      }
      dispatch(slice.actions.resetLoader());
      return Promise.reject(response);
    } catch (error) {
      dispatch(slice.actions.resetLoader());
      return Promise.reject(error);
    }
  };
}

// ----------------------------------------------------------------------

export function saveWebInfo(type, data) {
  return async () => {
    try {
      let endPoint = '/api/web/form/general';
      if (type === 'social') {
        endPoint = '/api/web/form/social';
      }
      const recordId = data?.id || ''
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`${endPoint}/${recordId}`, data);
      if (response.status) {
        dispatch(slice.actions.getWebInfoSuccess(response.data));
        return Promise.resolve(response);
      }
      dispatch(slice.actions.resetLoader());
      return Promise.reject(response);
    } catch (error) {
      dispatch(slice.actions.resetLoader());
      return Promise.reject(error);
    }
  };
}