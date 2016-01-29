import React, { Component } from 'react';
import utils from '../utils';
import classNames from 'classNames';
import  { Link } from 'react-router';

export default class LinkCell extends Component {
	render() {
		const cn = classNames({
			'b-cell': true,
			'active': this.props.active
		});
		const dayName = this.props.strNum === 0 ? utils.texts.days[this.props.dayInWeekNum]+', ' : '';
		return(
			<td className={cn} data-date={this.props.shortDate}>
				<Link to={"/"+this.props.date.format('D-M-YYYY')}>
					<div className='date'>{dayName} {this.props.shortDate}</div>
					<div className='title'>{this.props.title}</div>
					<div className='description'>{this.props.text}</div>
				</Link>
			</td>
		)
	}
}

