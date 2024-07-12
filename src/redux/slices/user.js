import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  count: 0,
  users: [],
  user: null,
  isLoading: false,
  selectedId: null,
  isDeleteModal: false,
  isStatusModal: false,
};

const slice = createSlice({
  name: 'user',
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
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // GET CATEGORIES COUNT
    getUsersCount(state, action) {
      state.isLoading = false;
      state.count = action.payload;
    },

    // GET CATEGORY
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },

    // DELETE CATEGORY
    deleteUserSuccess(state, action) {
      const { id } = action.payload;
      const deleteUser = state.users.filter((_user) => _user._id !== id);
      state.count -= 1;
      state.users = deleteUser;
      state.isLoading = false;
    },

    // UPDATE CATEGORY
    updateUserSuccess(state, action) {
      const user = action.payload;
      const updateUser = state.users.map((_user) => {
        if (_user._id === user._id) {
          return user;
        }
        return _user;
      });

      state.isLoading = false;
      state.users = updateUser;
    },

    // SELECT SERVICE
    selectUser(state, action) {
      const { id, catDeleteModal, catStatusModal } = action.payload;
      state.isDeleteModal = catDeleteModal;
      state.isStatusModal = catStatusModal;
      state.selectedId = id;
    },

    // OPEN DELETE MODAL
    openDeleteModal(state) {
      state.isDeleteModal = true;
    },

    // CLOSE DELETE MODAL
    closeDeleteModal(state) {
      state.isDeleteModal = false;
      state.selectedId = null;
    },

    // OPEN STATUS MODAL
    openStatusModal(state) {
      state.isStatusModal = true;
    },

    // CLOSE STATUS MODAL
    closeStatusModal(state) {
      state.isStatusModal = false;
      state.selectedId = null;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { selectUser, openDeleteModal, openStatusModal, closeDeleteModal, closeStatusModal } = slice.actions;

// ----------------------------------------------------------------------

export function getUsers(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post('/api/users/get', data);
      if (response.status) {
        dispatch(slice.actions.getUsersSuccess(response?.data?.user));
        dispatch(slice.actions.getUsersCount(response?.data?.count));
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

export function getUser(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/api/users/get/${id}`);
      dispatch(slice.actions.getUserSuccess(response?.data?.user[0]));
    } catch (error) {
      console.log(error.message);
      dispatch(slice.actions.resetLoader());
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function saveUser(data) {
  return async () => {
    try {
      const recordId = data?.id || ''
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`/api/users/form/${recordId}`, data);
      if (response.status) {
        dispatch(slice.actions.updateUserSuccess(response.data));
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

export function updateUserStatus(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`/api/users/status/${data?.id}`, data);
      if (response.status) {
        dispatch(slice.actions.updateUserSuccess(response.data));
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

export function deleteUser(id) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.delete(`/api/users/delete/${id}`);
      if (response.status) {
        dispatch(slice.actions.deleteUserSuccess({ id }));
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

export function userModel(Id, action) {
  return async () => {
    if (action === 'status') {
      dispatch(
        slice.actions.selectUser({
          id: Id,
          catStatusModal: true,
        })
      );
      dispatch(slice.actions.openStatusModal());
    } else {
      dispatch(
        slice.actions.selectUser({
          id: Id,
          catDeleteModal: true,
        })
      );
      dispatch(slice.actions.openDeleteModal());
    }
  };
}
