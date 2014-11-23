var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

// Render all the tags of a post, if there are any.
var Tags = React.createClass({
  render: function() {
    var tags = this.props.post.meta.Tags;
    var tagList = tags ? tags.map(function (tag) {
      return <Link to="tags" params={{tags:tag}} key={tag}>{tag}</Link>;
    }) : null;
    return <span className="tags">
          {tagList}
    </span>
  }
});

module.exports = Tags;
