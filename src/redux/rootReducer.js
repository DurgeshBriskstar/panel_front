import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// slices
import serviceReducer from './slices/service';

// ----------------------------------------------------------------------

const rootPersistConfig = {
    key: 'root',
    keyPrefix: 'redux-',
    whitelist: [],
};

const rootReducer = combineReducers({
    service: serviceReducer,
});

export { rootPersistConfig, rootReducer };
