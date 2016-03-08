require('./style.css');
import text from './content.js';
import React from 'react';
import ReactDOM from 'react-dom';

class Item extends React.Component {
	render() {
		return <li>{this.props.name}</li>
	}
}

class App extends React.Component {
	render() {
		const names = ['Alice', 'Bob', 'Carol'];
		return (
			<ul>
				{names.map(n=> <Item key={n} name={n} /> )}
			</ul>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#app'));
