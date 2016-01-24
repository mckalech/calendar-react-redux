import React, { Component } from 'react';


export default class Modal extends Component {
	render() {
		return (
			<div className="columns six">
				{this.props.params.date}
			</div>
		)
	}
}

