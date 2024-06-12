import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  count: 0,
  services: [],
  service: null,
  isLoading: false,
  selectedId: null,
  isDeleteModal: false,
  isStatusModal: false,
};

const slice = createSlice({
  name: 'service',
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

    // GET SERVICES
    getServicesSuccess(state, action) {
      state.isLoading = false;
      state.services = action.payload;
    },

    // GET SERVICES COUNT
    getServicesCount(state, action) {
      state.isLoading = false;
      state.count = action.payload;
    },

    // GET SERVICE
    getServiceSuccess(state, action) {
      state.isLoading = false;
      state.service = action.payload;
    },

    // DELETE SERVICE
    deleteServiceSuccess(state, action) {
      const { id } = action.payload;
      const deleteService = state.services.filter((_service) => _service.id !== id);
      state.count -= 1;
      state.services = deleteService;
      state.isLoading = false;
    },

    // UPDATE SERVICE
    updateServiceSuccess(state, action) {
      const service = action.payload;
      const updateSer = state.services.map((_ser) => {
        if (_ser.id === service.id) {
          return service;
        }
        return _ser;
      });

      state.isLoading = false;
      state.services = updateSer;
    },

    // SELECT SERVICE
    selectService(state, action) {
      const { id, serDeleteModal, serStatusModal } = action.payload;
      state.isDeleteModal = serDeleteModal;
      state.isOpenEmpStatusModal = serStatusModal;
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
export const { selectService, openDeleteModal, openStatusModal, closeDeleteModal, closeStatusModal } = slice.actions;

// ----------------------------------------------------------------------

export function getServices(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post('/api/service/list', data);
      dispatch(slice.actions.getServicesSuccess(response.data));
      dispatch(slice.actions.getServicesCount(response.count));
      if (response.success) {
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

export function getService(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/service/view/${id}`);
      dispatch(slice.actions.getServiceSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.resetLoader());
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createService(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post('/api/service/add', data);
      if (response.success) {
        dispatch(slice.actions.resetLoader());
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

export function updateService(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post('/api/service/update', data);
      if (response.success) {
        dispatch(slice.actions.resetLoader());
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

export function updateServiceStatus(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post('/api/service/status/update', data);
      if (response.success) {
        dispatch(slice.actions.updateServiceSuccess(response.data));
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

export function deleteService(id) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.delete(`/api/service/delete/${id}`);
      if (response.success) {
        dispatch(slice.actions.deleteServiceSuccess({ id }));
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

export function serviceModel(Id, action) {
  return async () => {
    if (action === 'status') {
      dispatch(
        slice.actions.selectService({
          id: Id,
          serStatusModal: true,
        })
      );
      dispatch(slice.actions.openStatusModal());
    } else {
      dispatch(
        slice.actions.selectService({
          id: Id,
          serDeleteModal: true,
        })
      );
      dispatch(slice.actions.openDeleteModal());
    }
  };
}

export function getServicePrice(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`/api/service/getServicePrice`, data);
      if (response.success) {
        return Promise.resolve(response);
      }
      return Promise.reject(response);
    } catch (error) {
      dispatch(slice.actions.resetLoader());
      return Promise.reject(error);
    }
  };
}
