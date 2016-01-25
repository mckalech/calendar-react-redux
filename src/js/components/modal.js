import React, { Component } from 'react';
import { connect } from 'react-redux';


class Modal extends Component {
	render() {
		let date = this.props.date;
		return (
			<div className="b-popup">
				<div className="b-popup__window">
					<span className="b-popup__close">x</span>
					<div className="b-popup__date"></div>
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
		)
	}
}

function mapStateToProps(state, ownProps) {
	return{
		date: ownProps.params.date
	}


}

export default connect(mapStateToProps)(Modal);