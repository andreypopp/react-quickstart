/**
 * @jsx React.DOM
 */

var React = require('react');

var MainPage = React.createClass({

  render: function() {
    return (
      <div className="UserPage">
        Hello, anonynous!
        <a href="/users/andrey">Login</a>
      </div>
    );
  }
});

module.exports = MainPage;
