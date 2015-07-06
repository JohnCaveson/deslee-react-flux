/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import EventEmitter from 'eventemitter3';
import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import DefaultComponents from '../content/DefaultComponents';
import Route from 'route-parser';

const CHANGE_EVENT = 'change';

var pages = {};

var loading = false;

var AppStore = Object.assign({}, EventEmitter.prototype, {
  pages,
  init() {
    Object.keys(DefaultComponents).forEach(path => {
      pages[path] = {
        component: DefaultComponents[path],
        originalPath: path
      };
    });
    this.emitChange();
  },

  isLoading() {
    return loading;
  },

  /**
   * Gets page data by the given URL path.
   *
   * @param {String} path URL path.
   * @returns {*} Page data.
   */
  getPage(path) {
    var result = Object.keys(pages).map(page => {
      return {
        path: page,
        route: new Route(page)
      }
    }).find(obj => {
      return obj.route.match(path)
    });
    if (result) {
      return pages[result.path];
    } else {
      return null;
    }
  },

  /**
   * Emits change event to all registered event listeners.
   *
   * @returns {Boolean} Indication if we've emitted an event.
   */
  emitChange() {
    return this.emit(CHANGE_EVENT);
  },

  /**
   * Register a new change event listener.
   *
   * @param {function} callback Callback function.
   */
  onChange(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove change event listener.
   *
   * @param {function} callback Callback function.
   */
  off(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppStore.dispatchToken = Dispatcher.register((action) => {

  switch (action.type) {

    case ActionTypes.GET_PAGE:
      loading = true;
      AppStore.emitChange();
      break;

    case ActionTypes.RECEIVE_PAGE:
      loading = false;
      if (!action.err) {
        pages[action.page.path] = action.page;
      }
      AppStore.emitChange();
      break;

    default:
      // Do nothing
  }

});

export default AppStore;
