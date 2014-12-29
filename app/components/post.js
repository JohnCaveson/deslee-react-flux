var React = require('react/addons');
var moment = require('moment');

var Tags = require('./tags');

var $ = require('jquery');

var actions = require('../actions/postActions');

// Render an individual post
var Post = React.createClass({
  getInitialState: function() {
    if (!this.props.post.loaded) {
      $.get('/blog/' + this.props.post.meta.slug + '.json', function(response) {
        actions.receivedPostFromMetadata(response);
      });
    }
    return {
      loaded: this.props.post.loaded
    }
  },
  componentWillReceiveProps: function(props) {
    this.setState({
      loaded: props.post.loaded
    })
  },
  render: function() {
    console.log("rendering again");
    var m = moment(this.props.post.meta.Date);
    var time = this.props.post.meta.Date ? <time dateTime={m.format("YYYY-MM-DD")}>{m.format("MMMM Do YYYY")}</time> : undefined;

    var body = this.state.loaded ? <div dangerouslySetInnerHTML={{__html: this.props.post.html}} /> : <div>LOADING...</div>

    return <article className="post">
        {time}
      <Tags post={this.props.post} />
      <h1>{this.props.post.meta.Title}</h1>
        {body}
    </article>
  }
});

module.exports = Post;
