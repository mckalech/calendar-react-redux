import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goToNextMonth, goToPrevMonth } from '../actions';
import Controls from './controls';



class Header extends Component {
	render() {
		const { dispatch, now } = this.props;
		return (
			<div className='b-header row'>
				<Controls
					date={now}
					clickMonthControl={this.clickMonthControl.bind(this)}/>
				<div className="columns six">{now.fromNow()}</div>

			</div>
		)
	}
	clickMonthControl(diff){
		if(diff>0){
			this.props.dispatch(goToNextMonth())
		}else{
			this.props.dispatch(goToPrevMonth())
		}
	}
}



function mapStateToProps(state) {
	return {
		now: state.currentDate
	};
}

export default connect(mapStateToProps)(Header);