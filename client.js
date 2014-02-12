/**
 * @jsx React.DOM
 */


var React       = require('react');
var ReactMount  = require('react/lib/ReactMount');
var ReactAsync  = require('react-async');
var Router      = require('react-router-component');

var Pages       = Router.Pages;
var Page        = Router.Page;

var UserPage = require('./pages/UserPage.js');
var MainPage = require('./pages/MainPage.js');

ReactMount.allowFullPageRender = true;

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
