import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// slices
import categoryReducer from './slices/category';
import blogReducer from './slices/blog';

// ----------------------------------------------------------------------

const rootPersistConfig = {
    key: 'root',
    keyPrefix: 'redux-',
    whitelist: [],
};

const rootReducer = combineReducers({
    category: categoryReducer,
    blog: blogReducer,
});

export { rootPersistConfig, rootReducer };
