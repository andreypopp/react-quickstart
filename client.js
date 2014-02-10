/**
 * @jsx React.DOM
 */


var React       = require('react');
var ReactMount  = require('react/lib/ReactMount');
var ReactAsync  = require('react-async');
var Router      = require('react-router-component');
var superagent  = require('superagent');

var Pages       = Router.Pages;
var Page        = Router.Page;

ReactMount.allowFullPageRender = true;

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

var App = React.createClass({

  onClick: function(e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      this.refs.router.navigate(e.target.attributes.href.value);
    }
  },
  
  render: function() {
    return (
      <html>
        <head>
          <script src="/bundle.js" />
        </head>
        <Pages ref="router" onClick={this.onClick} path={this.props.path}>
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
    ReactAsync.renderComponent(App(), document);
  }
}
