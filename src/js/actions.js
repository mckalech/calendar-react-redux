import fetch from 'isomorphic-fetch';
import constants from './constants';
import API from './api';
import moment from 'moment';
import history from './history'


function fetchEventsRequest(){
	return { type: constants.FETCH_EVENTS_REQUEST};
}
function fetchEventsSuccess(events){
	return { type: constants.FETCH_EVENTS_SUCCESS, events}
}
export function fetchEvents() {
	return function (dispatch) {
        dispatch(fetchEventsRequest());
        return API.get('/api/events')
        .then(json =>
		        dispatch(fetchEventsSuccess(json))
        );
    };
}


function postEventRequest(){
	return { type: constants.POST_EVENT_REQUEST};
}
function postEventSuccess(events){
	return { type: constants.POST_EVENT_SUCCESS, events};
}
export function postEvent(event) {
	return function (dispatch) {
		event.title = event.title.trim();
		event.text = event.text.trim();
		if(event.text === '' || event.title === '' || !event.date){ return;}
        dispatch(postEventRequest());
        return API.post('/api/events', event)
        .then(function(json) {
		        dispatch(closeModal());
		        return dispatch(postEventSuccess(json));
	    });
  };
}

function deleteEventRequest(){
	return { type: constants.DELETE_EVENT_REQUEST};
}
function deleteEventSuccess(cid){
	return { type: constants.DELETE_EVENT_SUCCESS, cid}
}
export function deleteEvent(cid) {
	return function (dispatch) {
        dispatch(deleteEventRequest());
        return API.remove('/api/events', {cid})
        .then(function() {
			dispatch(closeModal());
		    return dispatch(deleteEventSuccess(cid))
	    });
    };
}






export function goToNextMonth(){
	return function (dispatch, getState) {
        let mom = moment(getState().currentDate);
		mom = mom.add(1, 'months');
		dispatch(goToDate(mom));
    };
}

export function goToPrevMonth(){
	return function (dispatch, getState) {
        let mom = moment(getState().currentDate);
		mom = mom.add(-1, 'months');
		dispatch(goToDate(mom));
    };
}

export function goToDate(date){
	return { type: constants.GO_TO_DATE, date}
}

export function goToToday(){
	return function (dispatch) {
        let mom = moment();
		dispatch(goToDate(mom));
    };
}

export function modalOpened(date){
	return function (dispatch) {
		if(date.isValid()){
			dispatch(goToDate(date));
		}else{
			history.replace('/');
		}
    };
}


export function closeModal(){
	return function () {
		history.push('/');
    };
}