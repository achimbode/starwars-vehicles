import { combineReducers } from 'redux';
import vehiclesReducer from './red_vehicles.js';

var tomatoReducer = function(state = [], action) {return state;}

const reducer = combineReducers({
  vehicles: vehiclesReducer,
  tomato: tomatoReducer
});

export default reducer;
