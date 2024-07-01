import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  count: 0,
  sliders: [],
  slider: null,
  isLoading: false,
  selectedId: null,
  isDeleteModal: false,
  isStatusModal: false,
};

const slice = createSlice({
  name: 'slider',
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
    getSlidersSuccess(state, action) {
      state.isLoading = false;
      state.sliders = action.payload;
    },

    // GET SLIDERS COUNT
    getSlidersCount(state, action) {
      state.isLoading = false;
      state.count = action.payload;
    },

    // GET CATEGORY
    getSliderSuccess(state, action) {
      state.isLoading = false;
      state.slider = action.payload;
    },

    // DELETE CATEGORY
    deleteSliderSuccess(state, action) {
      const { id } = action.payload;
      const deleteSlider = state.sliders.filter((_slider) => _slider._id !== id);
      state.count -= 1;
      state.sliders = deleteSlider;
      state.isLoading = false;
    },

    // UPDATE CATEGORY
    updateSliderSuccess(state, action) {
      const slider = action.payload;
      const updateCat = state.sliders.map((_slider) => {
        if (_slider._id === slider._id) {
          return slider;
        }
        return _slider;
      });

      state.isLoading = false;
      state.sliders = updateCat;
    },

    // SELECT SERVICE
    selectSlider(state, action) {
      const { id, sliderDeleteModal, sliderStatusModal } = action.payload;
      state.isDeleteModal = sliderDeleteModal;
      state.isStatusModal = sliderStatusModal;
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
export const { selectSlider, openDeleteModal, openStatusModal, closeDeleteModal, closeStatusModal } = slice.actions;

// ----------------------------------------------------------------------

export function getSliders(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post('/api/sliders/get', data);
      if (response.status) {
        dispatch(slice.actions.getSlidersSuccess(response?.data?.slider));
        dispatch(slice.actions.getSlidersCount(response?.data?.count));
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

export function getSlider(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/api/sliders/get/${id}`);
      dispatch(slice.actions.getSliderSuccess(response?.data?.slider[0]));
    } catch (error) {
      console.log(error.message);
      dispatch(slice.actions.resetLoader());
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function saveSlider(data) {
  return async () => {
    try {
      const recordId = data?.id || ''
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`/api/sliders/form/${recordId}`, data);
      if (response.status) {
        dispatch(slice.actions.updateSliderSuccess(response.data));
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

export function updateSliderStatus(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`/api/sliders/status/${data?.id}`, data);
      if (response.status) {
        dispatch(slice.actions.updateSliderSuccess(response.data));
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

export function deleteSlider(id) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.delete(`/api/sliders/delete/${id}`);
      if (response.status) {
        dispatch(slice.actions.deleteSliderSuccess({ id }));
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

export function sliderModel(Id, action) {
  return async () => {
    if (action === 'status') {
      dispatch(
        slice.actions.selectSlider({
          id: Id,
          sliderStatusModal: true,
        })
      );
      dispatch(slice.actions.openStatusModal());
    } else {
      dispatch(
        slice.actions.selectSlider({
          id: Id,
          sliderDeleteModal: true,
        })
      );
      dispatch(slice.actions.openDeleteModal());
    }
  };
}
