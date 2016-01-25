import React, { Component } from 'react';
import { connect } from 'react-redux';
import BodyClassName from 'react-body-classname';
import {modalOpened, closeModal} from '../actions'


class Modal extends Component {
	componentDidMount(){
		this.props.dispatch(modalOpened(this.props.date));
	}
	render() {
		let date = this.props.date;
		return (
			<BodyClassName className='body-blocked'>
				<div className="b-popup">
					<div className="b-popup__window">
						<span className="b-popup__close" onClick={()=>this.props.dispatch(closeModal())}>x</span>
						<div className="b-popup__date">{date}</div>
						<div className="b-popup__title">
							<input type="text" placeholder="Заголовок" name="title" />
						</div>
						<div className="b-popup__description">
							<textarea name="description" placeholder="Описание"></textarea>
						</div>
						<p className="b-popup__warning-wrapper">
							<span className="b-popup__warning">Для сохранения заполните все поля</span>
						</p>
						<span className="b-popup__btn b-popup__btn_save">Сохранить</span>
						<span className="b-popup__btn b-popup__btn_delete">Удалить</span>
					</div>
				</div>
			</BodyClassName>
		)
	}
}

function mapStateToProps(state, ownProps) {
	const {events} = state;


	return{
		date: ownProps.params.date
	}


}

export default connect(mapStateToProps)(Modal);