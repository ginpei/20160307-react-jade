import React from 'react';
import ReactDOM from 'react-dom';
var jade = require('react-jade');  // leave from import syntax to keep precompile

class Item extends React.Component {
	render() {
		return jade.compile(`
li= this.props.name
`).call(this)
	}
}

class App extends React.Component {
	render() {
		let users = [
			{ id:1, name:'Alice' },
			{ id:2, name:'Bob' },
			{ id:3, name:'Carol' },
		];
		return jade.compile(`
ul
	each u in users
		Item(key=u.id,name=u.name)
`).call(this)
	}
}

ReactDOM.render(<App />, document.querySelector('#app'));
