import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  count: 0,
  graphics: [],
  graphic: null,
  isLoading: false,
  selectedId: null,
  isDeleteModal: false,
  isStatusModal: false,
};

const slice = createSlice({
  name: 'graphic',
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

    // GET SLIDERS
    getGraphicsSuccess(state, action) {
      state.isLoading = false;
      state.graphics = action.payload;
    },

    // GET SLIDERS COUNT
    getGraphicsCount(state, action) {
      state.isLoading = false;
      state.count = action.payload;
    },

    // GET CATEGORY
    getGraphicSuccess(state, action) {
      state.isLoading = false;
      state.graphic = action.payload;
    },

    // DELETE CATEGORY
    deleteGraphicSuccess(state, action) {
      const { id } = action.payload;
      const deleteGraphic = state.graphics.filter((_graphic) => _graphic._id !== id);
      state.count -= 1;
      state.graphics = deleteGraphic;
      state.isLoading = false;
    },

    // UPDATE CATEGORY
    updateGraphicSuccess(state, action) {
      const graphic = action.payload;
      const updateCat = state.graphics.map((_graphic) => {
        if (_graphic._id === graphic._id) {
          return graphic;
        }
        return _graphic;
      });

      state.isLoading = false;
      state.graphics = updateCat;
    },

    // SELECT SERVICE
    selectGraphic(state, action) {
      const { id, graphicDeleteModal, graphicStatusModal } = action.payload;
      state.isDeleteModal = graphicDeleteModal;
      state.isStatusModal = graphicStatusModal;
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
export const { selectGraphic, openDeleteModal, openStatusModal, closeDeleteModal, closeStatusModal } = slice.actions;

// ----------------------------------------------------------------------

export function getGraphics(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post('/api/graphics/get', data);
      if (response.status) {
        dispatch(slice.actions.getGraphicsSuccess(response?.data?.graphic));
        dispatch(slice.actions.getGraphicsCount(response?.data?.count));
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

export function getGraphic(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/api/graphics/get/${id}`);
      dispatch(slice.actions.getGraphicSuccess(response?.data?.graphic[0]));
    } catch (error) {
      console.log(error.message);
      dispatch(slice.actions.resetLoader());
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function saveGraphic(data) {
  return async () => {
    try {
      const recordId = data?.id || ''
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`/api/graphics/form/${recordId}`, data);
      if (response.status) {
        dispatch(slice.actions.updateGraphicSuccess(response.data));
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

export function updateGraphicStatus(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`/api/graphics/status/${data?.id}`, data);
      if (response.status) {
        dispatch(slice.actions.updateGraphicSuccess(response.data));
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

export function deleteGraphic(id) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.delete(`/api/graphics/delete/${id}`);
      if (response.status) {
        dispatch(slice.actions.deleteGraphicSuccess({ id }));
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

export function graphicModel(Id, action) {
  return async () => {
    if (action === 'status') {
      dispatch(
        slice.actions.selectGraphic({
          id: Id,
          graphicStatusModal: true,
        })
      );
      dispatch(slice.actions.openStatusModal());
    } else {
      dispatch(
        slice.actions.selectGraphic({
          id: Id,
          graphicDeleteModal: true,
        })
      );
      dispatch(slice.actions.openDeleteModal());
    }
  };
}
