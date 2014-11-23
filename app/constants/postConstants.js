var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    RECEIVE_POST: null

  }),
  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
