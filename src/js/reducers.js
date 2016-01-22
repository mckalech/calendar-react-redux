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
        case constants.FETCH_EVENTS_SUCCESS:
	        action.events.forEach((e) => e.date = moment(e.date));
			return action.events;
		case constants.POST_EVENT_SUCCESS:
			return [...state, action.event];
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
	let mom = moment(state);
	switch (action.type) {
		case constants.PREV_MONTH_CLICKED:
			return mom.add(-1, 'months');
		case constants.NEXT_MONTH_CLICKED:
			return mom.add(1, 'months');
		default:
			return mom;
	}
}


const calendarApp = combineReducers({
	events,
	currentDate,
	isFetching,
	currentUser
});

export default calendarApp;