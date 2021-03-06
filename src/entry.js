var React = require('react');
var ReactDOM = require('react-dom');
var jade = require('react-jade');  // leave from import syntax to keep precompile

var Item = require('./Item');

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
