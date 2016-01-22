import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions';
import utils from '../utils';
import moment from 'moment';
import classNames from 'classNames';


class Events extends Component {
	componentDidMount() {
		this.props.dispatch(fetchEvents());
	}
	render() {
		const { dispatch, events, now } = this.props;
		const weeksInMonth = utils.weeksInMonth(now),
			firstDayInMonth = utils.firstDayInMonth(now),
			daysInMonth = utils.daysInMonth(now),
			texts= utils.texts;
		let weeks = [],
			d=1,
			dayText;
		for(let i=0;i<weeksInMonth;i++){
			let days = [];
			let j=0;
			while (j<firstDayInMonth && i===0) {
				days.push(<td key={j}><div className='date'>{texts.days[j]}</div></td>);
				j++;
			}
			for(;j<7;j++,d++) {
				if (d>daysInMonth){days.push(<td key={j}></td>); continue; }
				dayText = i===0 ? texts.days[j]+", " + d : d;
				let info={
					title:'',
					text:''
				};
				if(findByDay(events, d)){
					info = findByDay(events, d);
				}
				const cn = classNames({
					'b-cell': true,
					'active': info.active
				});
				days.push(
					<td className={cn} data-date="{d}" key={j}>
						<div>
							<div className='date'>{dayText}</div>
							<div className='title'>{info.title}</div>
							<div className='description'>{info.text}</div>
						</div>
					</td>
				)
			}
			weeks.push(<tr key={i}>{days}</tr>)
		}

		console.log(events);
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