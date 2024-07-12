import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// slices
import userReducer from './slices/user';
import webReducer from './slices/webInfo';
import categoryReducer from './slices/category';
import blogReducer from './slices/blog';
import sliderReducer from './slices/slider';
import graphicReducer from './slices/graphic';

// ----------------------------------------------------------------------

const rootPersistConfig = {
    key: 'root',
    keyPrefix: 'redux-',
    whitelist: [],
};

const rootReducer = combineReducers({
    user: userReducer,
    webInfo: webReducer,
    category: categoryReducer,
    blog: blogReducer,
    slider: sliderReducer,
    graphic: graphicReducer,
});

export { rootPersistConfig, rootReducer };
