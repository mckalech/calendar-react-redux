import React, { Component } from 'react';
import utils from '../utils'
import  { Link } from 'react-router';

export default class ChirpBox extends Component {
	render(){
		var user = this.props.user;
		var timestamp = this.props.timestamp ?
            ' ' + String.fromCharCode(8226) + ' ' + this.props.timestamp :
            '';
		var id = (typeof user.userId === 'number') ? user.userId : user.cid;

		return (
			<li className="b-chirpbox row">
				<Link className="two columns" to={'/user/'+id}>
					<img src={utils.avatar(user.email)} />
				</Link>
				<div className="ten columns">
					<p>
						<strong>{user.fullname}</strong>
						<span className="b-chirpbox__timestamp">
							@{user.username} {timestamp}
						</span>
					</p>
					<p>{this.props.children}</p>
				</div>
			</li>
		)
	}
}

