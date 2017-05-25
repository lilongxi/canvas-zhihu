import reducer from './reducer';
import filter from './filter';
import { combineReducers } from 'redux';

//合并

export const todoApp = combineReducers({
	reducer,
	filter
})
