import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { Link } from 'react-router';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value:'',
			filteredEvents:[]
		};
	}
	filterEvents(text){
		let {events} = this.props;
		events = events.filter(function(e) {
			return e.title.toLowerCase().indexOf(text.toLowerCase()) > -1 || e.text.toLowerCase().indexOf(text.toLowerCase()) > -1
		});
		this.setState({
			filteredEvents: events
		});
	}
	render() {
		let variants = false;
		if(this.state.filteredEvents.length>0){
			variants = this.state.filteredEvents.map((e)=>
				<Link key={e.cid} to={"/"+e.date.format('D-M-YYYY')}>
					<span className="b-search__date">{e.date.format('D-M-YYYY')}</span>
					<span className="b-search__text">{e.title}</span>
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
		if(text.trim().length>2){
			this.filterEvents(text);
		}else{
			this.setState({
				filteredEvents: []
			});
		}
	}
}

function mapStateToProps(state) {
	return {
		events: state.events
	};
}


export default connect(mapStateToProps)(Search);