import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions';
import utils from '../utils';
import moment from 'moment';


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
				days.push(
					<td className="b-cell" data-date="{d}" key={j}>
						<div>
							<div className='date'>{dayText}</div>
							<div className='title'></div>
							<div className='description'></div>
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
	return events.filter(function(evnt){
		return utils.isInMonth(moment(evnt.date), currentDate);
	});
}

function mapStateToProps(state) {
	const {events, currentDate, currentUser} = state;
	const now = currentDate;
	return {
		events: getThisMonthEvents(events),
		now
	};
}


export default connect(mapStateToProps)(Events);