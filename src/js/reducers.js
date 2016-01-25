import constants from './constants';
import { combineReducers } from 'redux';
import moment from 'moment';
moment.locale('ru');

const initialState = {
	isFetching: false,
	events: [],
	currentUser: window.USER,
	currentDate: moment(),
	modalIsOpened: false
};


function events(state = initialState.events, action={}) {
	switch (action.type) {
        case constants.FETCH_EVENTS_SUCCESS:
	        action.events.forEach((e) => e.date = moment(e.date));
			return action.events;
		case constants.POST_EVENT_SUCCESS:
			action.event.date = moment(action.event.date);
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
		case constants.GO_TO_DATE:
			return action.date;
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