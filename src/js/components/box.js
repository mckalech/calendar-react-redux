var css = require("../../styles/styles.scss");
import React, { Component } from 'react';


export default class Box extends Component {

	render() {
		return (
			<div>
				<div className="b-header row">
					<div className="b-controls columns six">{'< - >'}</div>
					<div className="b-search columns six">search</div>
				</div>
				<div className="b-events row">
					events
				</div>
				{this.props.children}
			</div>
		)
	}
}
