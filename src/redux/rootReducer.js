import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// slices
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
    category: categoryReducer,
    slider: sliderReducer,
    blog: blogReducer,
});

export { rootPersistConfig, rootReducer };
