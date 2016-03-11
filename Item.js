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

module.exports = Item;
