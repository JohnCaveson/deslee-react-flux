var React = require('react/addons');
var moment = require('moment');

var Tags = require('./tags');

// Render an individual post
var Post = React.createClass({
  render: function() {
    var m = moment(this.props.post.meta.Date);
    var time = this.props.post.meta.Date ? <time dateTime={m.format("YYYY-MM-DD")}>{m.format("MMMM Do YYYY")}</time> : undefined;

    return <article className="post">
        {time}
      <Tags post={this.props.post} />
      <h1>{this.props.post.meta.Title}</h1>
      <div dangerouslySetInnerHTML={{__html: this.props.post.html}} />
    </article>
  }
});

module.exports = Post;
