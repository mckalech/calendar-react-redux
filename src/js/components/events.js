import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions';
import utils from '../utils';
import moment from 'moment';
import LinkCell from './link-cell';


class Events extends Component {
	componentDidMount() {
		this.props.dispatch(fetchEvents());
	}
	render() {
		const { events, now } = this.props;
		const weeksInMonth = utils.weeksInMonth(now),
			firstDayInMonth = utils.firstDayInMonth(now),
			daysInMonth = utils.daysInMonth(now);
		let weeks = [],
			d=1;
		for(let i=0;i<weeksInMonth;i++){
			let days = [];
			let j=0;
			while (j<firstDayInMonth && i===0) {
				days.push(<td key={j}><div className='date'>{utils.texts.days[j]}</div></td>);
				j++;
			}
			for(;j<7;j++,d++) {
				if (d>daysInMonth){days.push(<td key={j}></td>); continue; }
				let info={
					title:'',
					text:'',
					date:moment(now).date(d),
					shortDate:d

				};
				if(findByDay(events, d)){
					info = findByDay(events, d);
				}
				info.shortDate = d;
				days.push(
					<LinkCell strNum={i} dayInWeekNum={j} {...info} key={j}/>
				)
			}
			weeks.push(<tr key={i}>{days}</tr>)
		}

		return (
			<div className='b-table row'>
				<table>
					<tbody>
						{weeks}
					</tbody>
				</table>
			</div>
		)
	}
}


function getThisMonthEvents(events, currentDate){
	events = events.filter(function(evnt){
		return utils.isInMonth(moment(evnt.date), currentDate);
	});
	events.forEach(function(evnt){
		evnt.day = moment(evnt.date).date();
		evnt.active = true;
	});
	return events;
}

function findByDay(events, day){
	const evnt = events.filter((e)=>
		e.day === day
	);
	if(evnt.length) return evnt[0];
	return false;


}

function mapStateToProps(state) {
	const {events, currentDate, currentUser} = state;
	const now = currentDate;
	let monthEvents = getThisMonthEvents(events, currentDate);
	return {
		events: monthEvents,
		now,
		findByDay
	};
}

export default connect(mapStateToProps)(Events);