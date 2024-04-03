import { combineReducers } from 'redux';
import categoryReducer from './reducers/categoryReducer';
import commonReducer from './reducers/commonReducer';

const rootReducer = combineReducers({
    categoryReducer: categoryReducer,
    commonReducer: commonReducer,
});

export default rootReducer;
