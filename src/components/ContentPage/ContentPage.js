/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './ContentPage.less';
import withStyles from '../../decorators/withStyles';
import moment from 'moment';
import Tags from '../Tags';

@withStyles(styles)
class ContentPage {

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
    date: PropTypes.any
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    this.context.onSetTitle(this.props.title);
    var m = moment(new Date(this.props.date));
    var time = this.props.date ? <time dateTime={m.format('YYYY-MM-DD')}>{m.format('MMMM Do YYYY')}</time> : undefined;
    var body = <div dangerouslySetInnerHTML={{__html: this.props.content}} />;

    return (
      <article className="post">
        {time}
        <Tags post={this.props} />
        <h1>{this.props.title}</h1>
        {body}
      </article>
    );
  }

}

export default ContentPage;
