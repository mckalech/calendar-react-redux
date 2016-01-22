import React, { Component } from 'react';
import ChirpBox from './chirpBox'
import moment from 'moment';

export default class ChirpsList extends Component {
	render(){
		var items = this.props.chirps.map(function(chirp){
			return (<ChirpBox user={chirp}
			                  key={chirp.cid}
							  timestamp={moment(chirp.$created).fromNow()}>
					{chirp.text}
				</ChirpBox>
			)

		});
		return (
			<ul className="b-chirpslist row">
				{items}
			</ul>
		)
	}
}

