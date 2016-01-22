import constants from './constants';
import { combineReducers } from 'redux';
import moment from 'moment';

const initialState = {
	isFetching: false,
	events: [],
	currentUser: window.USER,
	currentDate: moment()
};


function events(state = initialState.events, action={}) {
	switch (action.type) {
        case constants.FETCH_CHIRPS_SUCCESS:
			return action.chirps;
		case constants.POST_CHIRP_SUCCESS:
			return [...state, action.chirp];
		default:
			return state;
	}
}

function isFetching(state = initialState.isFetching, action={}) {
	switch (action.type) {
		case constants.FETCH_EVENTS_REQUEST:
			return true;
		case constants.FETCH_EVENTS_SUCCESS:
			return false;
		default:
			return state;
	}
}

function currentUser(state = initialState.currentUser, action={}){
	switch (action.type) {
		default:
			return state;
	}
}

function currentDate(state = initialState.currentDate, action={}){
	switch (action.type) {
		default:
			return state;
	}
}


const calendarApp = combineReducers({
	events,
	currentDate,
	isFetching,
	currentUser
});

export default calendarApp;