import { combineReducers } from 'redux';
import adReducer from './adReducer';

export default combineReducers({
    fetchAds: adReducer,
});