import React, { Component } from 'react';


export default class Controls extends Component {
	render() {
		return (
			<div className="columns six">
				<span onClick={()=>this.props.clickMonthControl(-1)}>{'<-'}</span>
				<span>{this.props.date.format('D-M-YYYY')}</span>
				<span onClick={()=>this.props.clickMonthControl(1)}>{'->'}</span>
			</div>
		)
	}
}

