'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNexus = require('react-nexus');

var _reactNexus2 = _interopRequireDefault(_reactNexus);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _reactIdenticon = require('react-identicon');

var _reactIdenticon2 = _interopRequireDefault(_reactIdenticon);

var _reactStaticsStyles = require('react-statics-styles');

var _ = require('lodash');
var should = require('should');
var Promise = (global || window).Promise = require('bluebird');
var __DEV__ = process.env.NODE_ENV !== 'production';
var __PROD__ = !__DEV__;
var __BROWSER__ = typeof window === 'object';
var __NODE__ = !__BROWSER__;
if (__DEV__) {
  Promise.longStackTraces();
  Error.stackTraceLimit = Infinity;
}

var Users = (function (_React$Component) {
  function Users() {
    _classCallCheck(this, _Users);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Users, _React$Component);

  var _Users = Users;

  _createClass(_Users, [{
    key: 'render',
    value: function render() {
      var users = this.props.users;

      return _react2['default'].createElement(
        'div',
        { className: 'Users' },
        _react2['default'].createElement(
          'div',
          { className: 'ui list' },
          users.sort(function (a, b) {
            return a.nickname.localeCompare(b.nickname);
          }).map(function (_ref) {
            var h = _ref.h;
            var nickname = _ref.nickname;
            return _react2['default'].createElement(
              'div',
              { key: h, className: 'item' },
              _react2['default'].createElement(_reactIdenticon2['default'], { id: h, type: 'retro', className: 'ui avatar image' }),
              _react2['default'].createElement(
                'div',
                { className: 'content' },
                nickname
              )
            );
          }).toArray()
        )
      );
    }
  }], [{
    key: 'displayName',
    value: 'Users',
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      clientID: _react2['default'].PropTypes.string.isRequired,
      messages: _reactNexus2['default'].PropTypes.Immutable.Map,
      status: _reactNexus2['default'].PropTypes.Immutable.Map,
      users: _reactNexus2['default'].PropTypes.Immutable.Map },
    enumerable: true
  }]);

  Users = (0, _pureRenderDecorator2['default'])(Users) || Users;
  Users = (0, _reactStaticsStyles.styles)({
    '.Users': {
      height: '600px',
      overflowY: 'scroll' } })(Users) || Users;
  return Users;
})(_react2['default'].Component);

exports['default'] = Users;
module.exports = exports['default'];