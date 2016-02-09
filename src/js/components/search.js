import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { Link } from 'react-router';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value:''
		};
		this.bindDocumentEvent()
	}
	filterEvents(query){
		if(query.trim().length<3){
			return [];
		}else{
			let {events} = this.props,
			foundEvents=[];
			events.forEach(function(e){
				if (e.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
	                e.foundText = e.title;
					foundEvents.push(e);
	            } else if (e.text.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
	                e.foundText = e.text;
					foundEvents.push(e);
	            }

			});
			return foundEvents;
		}
	}
	render() {
		let variants = this.filterEvents(this.state.value);
		if(variants.length>0){
			variants = variants.map((e)=>
				<Link key={e.cid} to={"/"+e.date.format('D-M-YYYY')}>
					<span className="b-search__date">{e.date.format('D MMMM YYYY')} </span>
					<span className="b-search__text">{e.foundText}</span>
				</Link>
			);
			variants = (
				<ul className="b-search__variants">
					{variants}
				</ul>
			);
		}
		return (
			<div className="columns six b-search-wrapper">
				<input className="b-search" type="text"
			        placeholder="Поиск..."
			        value={this.state.value}
			        onChange={(e)=>this.handleInputChange(e)}/>
				{variants}

			</div>
		)
	}
	handleInputChange(e){
		const text = e.target.value;
		this.setState({
			value:text
		});

	}
	bindDocumentEvent(){
		window.addEventListener("click", function(e){
			if(!e.target.classList.contains('b-search')){
				this.setState({value:''})
			}
		}.bind(this))
	}
}

function mapStateToProps(state) {
	state.events.sort(function(a,b){
		if(a.date.isBefore(b.date)){
			return -1
		}else{
			return 1;
		}
	});
	return {
		events: state.events
	};
}


export default connect(mapStateToProps)(Search);