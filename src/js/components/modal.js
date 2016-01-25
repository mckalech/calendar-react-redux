import React, { Component } from 'react';
import { connect } from 'react-redux';
import BodyClassName from 'react-body-classname';
import {modalOpened, closeModal} from '../actions'
import moment from 'moment';


class Modal extends Component {
	componentDidMount(){
		this.props.dispatch(modalOpened(this.props.event.date));
	}
	render() {
		let date = this.props.event.date;
		return (
			<BodyClassName className='body-blocked'>
				<div className="b-popup" onClick={(e)=>this.handleOverlayClick(e)}>
					<div className="b-popup__window">
						<span className="b-popup__close" onClick={()=>this.close()}>x</span>
						<div className="b-popup__date">{date.format('D MMMM YYYY')}</div>
						<div className="b-popup__title">
							<input type="text" placeholder="Заголовок" name="title" />
						</div>
						<div className="b-popup__description">
							<textarea name="description" placeholder="Описание"></textarea>
						</div>
						<p className="b-popup__warning-wrapper">
							<span className="b-popup__warning">Для сохранения заполните все поля</span>
						</p>
						<span className="button button-primary">Сохранить</span>
						<span style={{float:"right"}} className="button">Удалить</span>
					</div>
				</div>
			</BodyClassName>
		)
	}
	close(){
		this.props.dispatch(closeModal());
	}
	handleOverlayClick(e){
		if(e.target.classList.contains('b-popup')){
			this.close()
		}
	}
}

function mapStateToProps(state, ownProps) {
	const events = state.events.filter( (e)=>
		e.date.format('D-M-YYYY') === ownProps.params.date
	);
	let event = {
		date:moment(ownProps.params.date, 'D-M-YYYY')
	};
	if(events.length){
		event = events[0];
	}
	return {
		event
	}


}

export default connect(mapStateToProps)(Modal);