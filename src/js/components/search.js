import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { Link } from 'react-router';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value:''
		};
	}
	filterEvents(text){
		if(text.trim().length<3){
			return [];
		}else{
			let {events} = this.props;
			return events.filter(function(e) {
				return e.title.toLowerCase().indexOf(text.toLowerCase()) > -1 || e.text.toLowerCase().indexOf(text.toLowerCase()) > -1
			});
		}
	}
	render() {
		let variants = this.filterEvents(this.state.value);
		if(variants.length>0){
			variants = variants.map((e)=>
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

	}
}

function mapStateToProps(state) {
	return {
		events: state.events
	};
}


export default connect(mapStateToProps)(Search);