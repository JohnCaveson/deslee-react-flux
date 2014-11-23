var postDispatcher = require('../dispatchers/postDispatcher');
var postConstants = require('../constants/postConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = postConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _posts = [];

function _addPost(post) {
  _posts.push(post);
}

var postStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllPosts: function() {
    return _posts;
  }
});

postStore.dispatchToken = postDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {
    case ActionTypes.RECEIVE_POST:
      _addPost(action.post);
      postStore.emitChange();
      break;
  }
});

module.exports = postStore;
