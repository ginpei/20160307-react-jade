var React = require("react"); module.exports = function (locals) {
  var tags = [];
  tags.push(React.createElement("div", {}, "Hello, {{name}}'s world!"));
  if (tags.length === 1 && !Array.isArray(tags[0])) {
    return tags.pop();
  }
  tags.unshift("div", null);
  return React.createElement.apply(React, tags);
}