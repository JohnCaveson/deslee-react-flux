import React, { PropTypes } from 'react';
import styles from './HomePage.less';
import withStyles from '../../decorators/withStyles';
import defaultRoute from '../../decorators/defaultRoute';
import blog from '../../content/Blog';
import PostsPage from '../PostsPage';


@defaultRoute('/')
@withStyles(styles)
class HomePage {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = 'Home';
    this.context.onSetTitle(title);
    return (<section className="posts">
      <PostsPage posts={blog} />
    </section>);
  }

}

export default HomePage;
