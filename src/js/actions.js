import fetch from 'isomorphic-fetch';
import constants from './constants';
import API from './api';
import moment from 'moment';
import history from './history'


function postEventRequest(){
	return { type: constants.POST_EVENT_REQUEST};
}
function postEventSuccess(event){
	return { type: constants.POST_EVENT_SUCCESS, event};
}
export function postEvent(event) {
	return function (dispatch) {
		event.heading = event.heading.trim();
		event.text = event.text.trim();
		if(event.text === '' || event.heading === '' || !event.date){ return;}
        dispatch(postEventRequest());
        return API.post('/api/events', event)
        .then(json =>
		        dispatch(postEventSuccess(json))
        );
  };
}

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



export function modalOpened(date){
	return function (dispatch) {
		let mom = moment(date, 'D-M-YYYY');
		if(mom.isValid()){
			dispatch(goToDate(mom));
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