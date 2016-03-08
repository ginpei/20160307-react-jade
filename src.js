import React from 'react';
import renderApp from './app';

const App = React.createClass({
	render() {
		return renderApp();
	}
});

React.render(<App />, document.body);
