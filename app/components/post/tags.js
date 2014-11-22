var React = require('react/addons');

// Render all the tags of a post, if there are any.
var Tags = React.createClass({
  render: function() {
    var tags = this.props.post.meta.Tags;
    var tagList = tags ? tags.map(function (tag) {
      return <a href="" key={tag}>{tag}</a>;
    }) : null;
    return <span className="tags">
          {tagList}
    </span>
  }
});

module.exports = Tags;
