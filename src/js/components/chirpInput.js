import React, { Component } from 'react';


export default class ChirpInput extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state =  {
			value: ''
		}
	}
	render(){
		return (
			<div className="b-chirpinput row">
				<div className="b-chirpinput__input six columns">
					<input 
						onChange={e=>this.setState({value: e.target.value})}
						value={this.state.value}
						className='u-full-width' 
						placeholder='Say Something!'
						type='text'/>
				</div>
				<div className="b-chirpinput__btn three columns">
					<button className='u-full-width button-primary' onClick={this.handleClick}>Chirp!</button>
				</div>
				<div className="b-chirpinput__btn three columns">
					<button className='u-full-width button' onClick={()=>this.props.onUpdate()}>Update!</button>
				</div>

			</div>
		)
	}
	handleClick(){
		this.props.onSave(this.state.value);
		this.setState({value:''});
	}
}

