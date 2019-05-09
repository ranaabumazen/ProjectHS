import { AD_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    ads: []
};

export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
        case AD_FETCH_SUCCESS:
            return {...state, ads:action.payload};
        default: 
            return state;
    }
};