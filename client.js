/**
 * @jsx React.DOM
 */


var React       = require('react');
var ReactMount  = require('react/lib/ReactMount');
var ReactAsync  = require('react-async');
var ReactRouter = require('react-router-component');
var superagent  = require('superagent');

var Pages       = ReactRouter.Pages;
var Page        = ReactRouter.Page;
var Link        = ReactRouter.Link;

ReactMount.allowFullPageRender = true;

var MainPage = React.createClass({

  render: function() {
    return (
      <div className="UserPage">
        Hello, anonymous!
        <Link href="/users/doe">Login</Link>
      </div>
    );
  }
});

var UserPage = React.createClass({
  mixins: [ReactAsync.Mixin],

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

var App = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <script src="/bundle.js" />
        </head>
        <Pages ref="router" path={this.props.path}>
          <Page path="/" handler={MainPage} />
          <Page path="/users/:username" handler={UserPage} />
        </Pages>
      </html>
    );
  }
});

module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}
