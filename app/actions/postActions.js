var postDispatcher = require('../dispatchers/postDispatcher');
var postConstants = require('../constants/postConstants');

var ActionTypes = postConstants.ActionTypes;

module.exports = {
  receivedPost: function(post) {
    postDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_POST,
      post: post
    })
  }
};
