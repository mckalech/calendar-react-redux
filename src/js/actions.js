import fetch from 'isomorphic-fetch';
import constants from './constants';
import API from './api';


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


export function nextMonthClicked(){
	return { type: constants.NEXT_MONTH_CLICKED}
}

export function prevMonthClicked(){
	return { type: constants.PREV_MONTH_CLICKED}
}