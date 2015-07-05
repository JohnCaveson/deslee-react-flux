import React, { PropTypes } from 'react';
import styles from './HomePage.less';
import withStyles from '../../decorators/withStyles';
import defaultRoute from '../../decorators/defaultRoute';

@defaultRoute('/')
@withStyles(styles)
class HomePage {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = 'Home';
    this.context.onSetTitle(title);
    return (
      <div className="HomePage">
        <div className="HomePage-container">
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </div>
    );
  }

}

export default HomePage;
