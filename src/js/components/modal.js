import React, { Component } from 'react';
import { connect } from 'react-redux';
import BodyClassName from 'react-body-classname';
import {modalOpened, closeModal, postEvent, deleteEvent} from '../actions'
import moment from 'moment';


class Modal extends Component {
	constructor(props) {
		super(props);
		this.esc = this.handleEscKey.bind(this);
		this.state = {
			title: props.event.title,
			text:props.event.text
		};
	}
	componentDidMount(){
		const {dispatch, event} = this.props;
		dispatch(modalOpened(event.date));
		window.addEventListener("keydown", this.esc, false);
	}
	componentWillUnmount(){
		window.removeEventListener("keydown", this.esc, false);
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			title: nextProps.event.title,
			text: nextProps.event.text
		});
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
							<input type="text"
							       placeholder="Заголовок"
							       name="title"
							       value={this.state.title}
							       onChange={(e)=>this.handleInputChange(e)}/>
						</div>
						<div className="b-popup__description">
							<textarea
								name="description"
								placeholder="Описание"
								value={this.state.text}
								onChange={(e)=>this.handleTextareaChange(e)}>

							</textarea>
						</div>
						<p className="b-popup__warning-wrapper">
							<span className="b-popup__warning">Для сохранения заполните все поля</span>
						</p>
						<span className="button button-primary" onClick={()=>this.onSave()}>Сохранить</span>
						<span style={{float:"right"}} className="button"  onClick={()=>this.onDelete()}>Удалить</span>
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
	handleInputChange(e){
		this.setState({
			title:e.target.value
		})
	}
	handleTextareaChange(e){
		this.setState({
			text:e.target.value
		})
	}
	handleEscKey(event){
        if(event.keyCode == 27){
	        this.close()
        }
    }
	onSave(){
		const { cid, date} = this.props.event;
		const {title, text} = this.state;
		const event ={
			title,
			text,
			cid,
			date: date.toDate()
		};
		this.props.dispatch(postEvent(event))
	}
	onDelete(){
		if(this.props.event.cid !== undefined){
			this.props.dispatch(deleteEvent(this.props.event.cid));
		}else{
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