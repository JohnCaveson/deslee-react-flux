var postDispatcher = require('../dispatchers/postDispatcher');
var postConstants = require('../constants/postConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var ActionTypes = postConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _posts = [];

function _addPost(post) {
  _posts.push(post);
}

function _updatePost(post) {
  post.loaded = true;
  var idx = _.findIndex(_posts, function(p) {
    return post.meta.slug == p.meta.slug;
  });
  _posts[idx] = post;
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
      action.post.loaded = true;
      _addPost(action.post);
      postStore.emitChange();
      break;
    case ActionTypes.RECEIVE_METADATA:
      _addPost({meta: action.meta, loaded: false});
      postStore.emitChange();
      break;
    case ActionTypes.UPDATE_POST:
      _updatePost(action.post);
      postStore.emitChange();
      break;
  }
});

module.exports = postStore;
