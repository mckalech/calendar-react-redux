import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goToNextMonth, goToPrevMonth, goToToday } from '../actions';
import Controls from './controls';
import Search from './search';



class Header extends Component {
	render() {
		const { dispatch, now } = this.props;
		return (
			<div className='b-header'>
				<div className="b-container row">
					<Controls
						date={now}
						clickMonthControl={this.clickMonthControl.bind(this)}
						clickToday={this.clickToday.bind(this)}/>
					<Search />
				</div>
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
	clickToday(){
		this.props.dispatch(goToToday())
	}
}



function mapStateToProps(state) {
	return {
		now: state.currentDate
	};
}

export default connect(mapStateToProps)(Header);