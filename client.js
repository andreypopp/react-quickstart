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
var NotFound    = ReactRouter.NotFound;
var Link        = ReactRouter.Link;

ReactMount.allowFullPageRender = true;

var MainPage = React.createClass({

  render: function() {
    return (
      <div className="MainPage">
        <h1>Hello, anonymous!</h1>
        <p><Link href="/users/doe">Login</Link></p>
      </div>
    );
  }
});

var UserPage = React.createClass({
  mixins: [ReactAsync.Mixin],

  getUserInfo: function(username, cb) {
    superagent.get(
      'http://localhost:3000/api/users/' + username,
      function(err, res) {
        cb(err, res ? res.body : null);
      });
  },

  getInitialStateAsync: function(cb) {
    this.getUserInfo(this.props.username, cb);
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.username !== nextProps.username) {
      this.getUserInfo(nextProps.username, function(err, info) {
        if (err) {
          throw err;
        }
        this.setState(info);
      }.bind(this));
    }
  },

  render: function() {
    var otherUser = this.props.username === 'doe' ? 'ivan' : 'doe';
    return (
      <div className="UserPage">
        <h1>Hello, {this.state.name}!</h1>
        <p>
          Go to <Link href={"/users/" + otherUser}>/users/{otherUser}</Link>
        </p>
        <p><Link href="/">Logout</Link></p>
      </div>
    );
  }
});

var NotFoundHandler = React.createClass({

  render: function() {
    return (
      <p>Page not found</p>
    );
  }
});

var App = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/assets/style.css" />
          <script src="/assets/bundle.js" />
        </head>
        <Pages className="App" path={this.props.path}>
          <Page path="/" handler={MainPage} />
          <Page path="/users/:username" handler={UserPage} />
          <NotFound handler={NotFoundHandler} />
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
