import React, { PropTypes } from 'react';
import Link from '../../utils/Link';


class Tags {
  static propTypes = {
    post: PropTypes.object.isRequired
  };

  render() {
    var tags = this.props.post.tags;
    var tagList = tags ? tags.map(function (tag) {
      return <a href={'/tags/' + tag} key={tag} onClick={Link.handleClick}>{tag}</a>;
    }) : null;
    return (<span className="tags">
          {tagList}
    </span>);
  }
}

export default Tags;
