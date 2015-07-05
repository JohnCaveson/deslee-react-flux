/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import fs from 'fs';
import path from 'path';
import marked from 'marked';
import jade from 'jade';
import fm from 'front-matter';
import Dispatcher from './Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import DefaultComponents from '../content/DefaultComponents';

// A folder with Jade/Markdown/HTML content pages
const CONTENT_DIR = path.join(__dirname, './content');

// Check if that directory exists, print an error message if not
fs.exists(CONTENT_DIR, (exists) => {
  if (!exists) {
    console.error(`Error: Directory '${CONTENT_DIR}' does not exist.`);
  }
});

// Extract 'front matter' metadata and generate HTML
function parseContent(uri, data, type) {
  return new Promise((resolve, reject) => {
    let content = fm(data);
    let html;
    switch(type) {
      case 'md':
        html = marked(content.body);
        break;
      case 'jade':
        html = jade.render(content.body, null, '  ');
        break;
      default:
        reject('invalid type');
    }
    resolve(Object.assign({path: uri, content: html}, content.attributes))
  });
}

function tryFile(uri, type) {
  return new Promise((resolve, reject) => {
    let fileName;
    switch (type) {
      case 'md':
        fileName = path.join(CONTENT_DIR, (uri === '/' ? '/index' : uri) + '.md');
        break;
      case 'jade':
        fileName = path.join(CONTENT_DIR, (uri === '/' ? '/index' : uri) + '.jade');
        break;
      default:
        reject('invalid type');
    }
    fs.readFile(fileName, {encoding: 'utf8'}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        parseContent(uri, data, type).then(page => {
          resolve(page)
        }).catch(error => {
          reject(error)
        });
      }
    });
  });
}

export default {

  getPage: (uri) => {
    // Read page content from a Jade file
    return new Promise((resolve, reject) => {

      // page is dynamic, does not exist in the database
      if(DefaultComponents[uri]) {
        resolve({
          path: uri,
          component: DefaultComponents[uri]
        });
      } else {
        // try jade file
        tryFile(uri, 'jade').then(resolve).catch(() => {
          // try markdown file
          tryFile(uri, 'md').then(resolve).catch(reject);
        });

        /*// try jade file
        let fileName = path.join(CONTENT_DIR, (uri === '/' ? '/index' : uri) + '.jade');
        fs.readFile(fileName, {encoding: 'utf8'}, (err, data) => {
          if (!err) {
            resolve(parseJade(uri, data));
          } else if (err.code === 'ENOENT') {
            // try markdown file
            fileName = path.join(CONTENT_DIR, (uri === '/' ? '/index' : uri) + '.md');
            fs.readFile(fileName, {encoding: 'utf8'}, (err2, data2) => {
              if (!err2) {
                resolve(parseMarkdown(uri, data2));
              } else {
                reject(err2);
              }
            });
          }
          else {
            reject(err);
          }
        });*/
      }
    }).then((page) => {
      Dispatcher.dispatch({
        type: ActionTypes.RECEIVE_PAGE,
        page: page}
      );
      return Promise.resolve(page);
    });
  }

};
