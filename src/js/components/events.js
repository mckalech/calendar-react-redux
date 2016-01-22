import React, { Component } from 'react';
import ChirpInput from './chirpInput'
import ChirpsList from './chirpsList'
import { connect } from 'react-redux';
import { postChirp, fetchChirps } from '../actions';

class Events extends Component {
	//componentDidMount() {
     //       this.props.dispatch(fetchChirps());
	//}
	render() {
	//	const { dispatch, visibleChirps, isFetching } = this.props;
		return (
		<div></div>
	//			<ChirpInput
	//				onSave={text =>
     //                   dispatch(postChirp(text))
     //               }
	//				onUpdate={()=>
	//					dispatch(fetchChirps())
	//				}/>
	//			<div className="b-fetching-status">
	//				{isFetching ? 'Fetching...' : ''}
	//			</div>
	//			<ChirpsList chirps={visibleChirps}/>
	//	</div>
		)
	}
}

function selectChirps(chirps, currentUser) {
	//var ids = [currentUser.cid].concat(currentUser.following);
	//return chirps.filter(function(chirp){
	//	return ids.indexOf(chirp.userId) >= 0;
	//}).sort(function (a, b) {
     //       return +new Date(b.$created) - +new Date(a.$created);
	//});
}

function mapStateToProps(state) {
	const {chirps, isFetching, currentUser} = state;
	return {
		visibleChirps: selectChirps(chirps, currentUser),
		isFetching
	};
	return {}
}


export default connect(mapStateToProps)(Events);