import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import {Router, Route, IndexRoute} from 'react-router';
import Box from './components/box';
import Modal from './components/modal';
import history from './history';


const store = configureStore();

ReactDOM.render(
	(
		<Provider store={store}>
			<Router history={history}>
				<Route path="/" component={Box}>
					<Route path="/:date" component={Modal} />
				</Route>
			</Router>
		</Provider>
	),document.getElementById('content')
);

