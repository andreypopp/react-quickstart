/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync  = require('react-async');
var superagent  = require('superagent');

var UserPage = ReactAsync.createClass({

  getInitialStateAsync: function(cb) {
    superagent.get(
      'http://localhost:3000/api/users/' + this.props.username,
      function(err, res) {
        cb(err, res ? res.body : null);
      });
  },

  render: function() {
    return (
      <div className="MainPage">
        {this.state.username ? 'Hello, ' + this.state.username : 'Loading...'}
      </div>
    );
  }
});

module.exports = UserPage;
