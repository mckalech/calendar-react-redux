import React, { Component } from 'react';


export default class Controls extends Component {
	render() {
		return (
			<div className="columns six b-header__controls">
				<span className="b-header__nav b-header__nav_prev" onClick={()=>this.props.clickMonthControl(-1)}></span>
				<span className="b-header__month">{this.props.date.format('MMMM YYYY')}</span>
				<span className="b-header__nav b-header__nav_next" onClick={()=>this.props.clickMonthControl(1)}></span>
				<span className="b-header__today" onClick={()=>this.props.clickToday()}>Сегодня</span>
			</div>
		)
	}
}

