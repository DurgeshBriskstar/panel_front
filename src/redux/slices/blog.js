import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import { fileToBaseURL } from 'src/utils/base64';

// ----------------------------------------------------------------------

const initialState = {
  count: 0,
  blogs: [],
  blog: null,
  isLoading: false,
  selectedId: null,
  isDeleteModal: false,
  isStatusModal: false,
};

const slice = createSlice({
  name: 'blog',
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
    getBlogsSuccess(state, action) {
      state.isLoading = false;
      state.blogs = action.payload;
    },

    // GET CATEGORIES COUNT
    getBlogsCount(state, action) {
      state.isLoading = false;
      state.count = action.payload;
    },

    // GET CATEGORY
    getBlogSuccess(state, action) {
      state.isLoading = false;
      state.blog = action.payload;
    },

    // DELETE CATEGORY
    deleteBlogSuccess(state, action) {
      const { id } = action.payload;
      const deleteBlog = state.blogs.filter((_blog) => _blog._id !== id);
      state.count -= 1;
      state.blogs = deleteBlog;
      state.isLoading = false;
    },

    // UPDATE CATEGORY
    updateBlogSuccess(state, action) {
      const blog = action.payload;
      const updateCat = state.blogs.map((_blog) => {
        if (_blog._id === blog._id) {
          return blog;
        }
        return _blog;
      });

      state.isLoading = false;
      state.blogs = updateCat;
    },

    // SELECT SERVICE
    selectBlog(state, action) {
      const { id, blogDeleteModal, blogStatusModal } = action.payload;
      state.isDeleteModal = blogDeleteModal;
      state.isStatusModal = blogStatusModal;
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
export const { selectBlog, openDeleteModal, openStatusModal, closeDeleteModal, closeStatusModal } = slice.actions;

// ----------------------------------------------------------------------

export function getBlogs(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post('/api/blogs/get', data);
      if (response.status) {
        dispatch(slice.actions.getBlogsSuccess(response?.data?.blog));
        dispatch(slice.actions.getBlogsCount(response?.data?.count));
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

export function getBlog(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/api/blogs/get/${id}`);
      dispatch(slice.actions.getBlogSuccess(response?.data?.blog[0]));
    } catch (error) {
      console.log(error.message);
      dispatch(slice.actions.resetLoader());
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function saveBlog(data) {
  return async () => {
    try {
      const recordId = data?.id || ''
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`/api/blogs/form/${recordId}`, data);
      if (response.status) {
        dispatch(slice.actions.updateBlogSuccess(response.data));
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

export function updateBlogStatus(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`/api/blogs/status/${data?.id}`, data);
      if (response.status) {
        dispatch(slice.actions.updateBlogSuccess(response.data));
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

export function deleteBlog(id) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.delete(`/api/blogs/delete/${id}`);
      if (response.status) {
        dispatch(slice.actions.deleteBlogSuccess({ id }));
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

export function blogModel(Id, action) {
  return async () => {
    if (action === 'status') {
      dispatch(
        slice.actions.selectBlog({
          id: Id,
          blogStatusModal: true,
        })
      );
      dispatch(slice.actions.openStatusModal());
    } else {
      dispatch(
        slice.actions.selectBlog({
          id: Id,
          blogDeleteModal: true,
        })
      );
      dispatch(slice.actions.openDeleteModal());
    }
  };
}

// ----------------------------------------------------------------------

export function uploadDescriptionImage(file) {
  return async () => {
    try {
      const base64 = await fileToBaseURL(file);
      const data = { image: base64 };
      const response = await axios.post(`/api/blogs/image/upload`, data);
      if (response.status) {
        return Promise.resolve(response);
      }
      return Promise.reject(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

// ----------------------------------------------------------------------