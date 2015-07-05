/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import http from 'superagent';
import { canUseDOM } from 'react/lib/ExecutionEnvironment';
import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import DefaultComponents from '../content/DefaultComponents';

export default {

  goToPath(path, options) {
    if (options && options.noModifyState) {
    } else {
      let currentPath = decodeURI(window.location.pathname);
      if (canUseDOM && currentPath != path) {
        if (options && options.replace) {
          window.history.replaceState({}, document.title, path);
        } else {
          window.history.pushState({}, document.title, path);
        }
      }
    }

    Dispatcher.dispatch({
      type: ActionTypes.CHANGE_LOCATION,
      path
    });
  },

  navigateTo(path, options, cb) {
    // don't load the page if you don't have to
    if (DefaultComponents[path]) {
      this.goToPath(path, options);
      if (cb) {
        cb();
      }
    } else {
      this.loadPage(path, () => {
        this.goToPath(path, options);
        if (cb) {
          cb();
        }
      });
    }
  },

  loadPage(path, cb) {
    Dispatcher.dispatch({
      type: ActionTypes.GET_PAGE,
      path
    });

    http.get('/api/query?path=' + encodeURI(path))
      .accept('application/json')
      .end((err, res) => {
        Dispatcher.dispatch({
          type: ActionTypes.RECEIVE_PAGE,
          path,
          err,
          page: res ? res.body : null
        });
        if (cb) {
          cb();
        }
      });
  }

};
