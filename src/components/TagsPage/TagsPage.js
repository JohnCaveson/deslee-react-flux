/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './TagsPage.less';
import withStyles from '../../decorators/withStyles';
import defaultRoute from '../../decorators/defaultRoute';
import PostsPage from '../PostsPage';
import Route from 'route-parser';
import blog from '../../content/Blog';

@defaultRoute('/tags/:tags')
@withStyles(styles)
class TagsPage {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    var params = new Route(this.props.originalPath).match(this.props.path);
    let title = 'Posts tagged with "{params.tags}"';
    this.context.onSetTitle(title);
    return (<section className="posts">
      <h1>Posts tagged with "{params.tags}"</h1>
      <PostsPage posts={blog.filter(post => {
        return post.tags.find(tag => {
          return params.tags.split(',').includes(tag)
        })
      })} />
    </section>);
  }

}

export default TagsPage;
