import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// slices
import webReducer from './slices/webInfo';
import categoryReducer from './slices/category';
import sliderReducer from './slices/slider';
import blogReducer from './slices/blog';

// ----------------------------------------------------------------------

const rootPersistConfig = {
    key: 'root',
    keyPrefix: 'redux-',
    whitelist: [],
};

const rootReducer = combineReducers({
    webInfo: webReducer,
    category: categoryReducer,
    slider: sliderReducer,
    blog: blogReducer,
});

export { rootPersistConfig, rootReducer };
