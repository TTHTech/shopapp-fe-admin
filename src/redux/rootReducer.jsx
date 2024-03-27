import { combineReducers } from 'redux';
import categoryReducer from './reducers/categoryReducer';

const rootReducer = combineReducers({
    categoryReducer: categoryReducer,
});

export default rootReducer;
