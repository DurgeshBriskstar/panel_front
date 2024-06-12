import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// slices
import categoryReducer from './slices/category';

// ----------------------------------------------------------------------

const rootPersistConfig = {
    key: 'root',
    keyPrefix: 'redux-',
    whitelist: [],
};

const rootReducer = combineReducers({
    category: categoryReducer,
});

export { rootPersistConfig, rootReducer };
