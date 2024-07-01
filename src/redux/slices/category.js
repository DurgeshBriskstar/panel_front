import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  count: 0,
  categories: [],
  category: null,
  isLoading: false,
  selectedId: null,
  isDeleteModal: false,
  isStatusModal: false,
};

const slice = createSlice({
  name: 'category',
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
    getCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    },

    // GET CATEGORIES COUNT
    getCategoriesCount(state, action) {
      state.isLoading = false;
      state.count = action.payload;
    },

    // GET CATEGORY
    getCategorySuccess(state, action) {
      state.isLoading = false;
      state.category = action.payload;
    },

    // DELETE CATEGORY
    deleteCategorySuccess(state, action) {
      const { id } = action.payload;
      const deleteCategory = state.categories.filter((_category) => _category._id !== id);
      state.count -= 1;
      state.categories = deleteCategory;
      state.isLoading = false;
    },

    // UPDATE CATEGORY
    updateCategorySuccess(state, action) {
      const category = action.payload;
      const updateCat = state.categories.map((_cat) => {
        if (_cat._id === category._id) {
          return category;
        }
        return _cat;
      });

      state.isLoading = false;
      state.categories = updateCat;
    },

    // SELECT SERVICE
    selectCategory(state, action) {
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
export const { selectCategory, openDeleteModal, openStatusModal, closeDeleteModal, closeStatusModal } = slice.actions;

// ----------------------------------------------------------------------

export function getCategories(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post('/api/categories/get', data);
      if (response.status) {
        dispatch(slice.actions.getCategoriesSuccess(response?.data?.category));
        dispatch(slice.actions.getCategoriesCount(response?.data?.count));
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

export function getCategory(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/api/categories/get/${id}`);
      dispatch(slice.actions.getCategorySuccess(response?.data?.category[0]));
    } catch (error) {
      console.log(error.message);
      dispatch(slice.actions.resetLoader());
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function saveCategory(data) {
  return async () => {
    try {
      const recordId = data?.id || ''
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`/api/categories/form/${recordId}`, data);
      if (response.status) {
        dispatch(slice.actions.updateCategorySuccess(response.data));
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

export function updateCategoryStatus(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`/api/categories/status/${data?.id}`, data);
      if (response.status) {
        dispatch(slice.actions.updateCategorySuccess(response.data));
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

export function deleteCategory(id) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.delete(`/api/categories/delete/${id}`);
      if (response.status) {
        dispatch(slice.actions.deleteCategorySuccess({ id }));
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

export function categoryModel(Id, action) {
  return async () => {
    if (action === 'status') {
      dispatch(
        slice.actions.selectCategory({
          id: Id,
          catStatusModal: true,
        })
      );
      dispatch(slice.actions.openStatusModal());
    } else {
      dispatch(
        slice.actions.selectCategory({
          id: Id,
          catDeleteModal: true,
        })
      );
      dispatch(slice.actions.openDeleteModal());
    }
  };
}
