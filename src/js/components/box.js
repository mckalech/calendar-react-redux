var css = require("../../styles/styles.scss");
import React, { Component } from 'react';
import Events from './events';
import Header from './header';

export default class Box extends Component {

	render() {
		return (
			<div>
				<Header />
				<Events />
				{this.props.children}
			</div>
		)
	}
}
