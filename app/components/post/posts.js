var React = require('react/addons');
var _ = require('lodash');
var moment = require('moment');

var Tags = require('./tags');

var Router = require('react-router');
var Link = Router.Link;

// Render a list of posts
var Posts = React.createClass({
  getInitialState: function() {
    return {
      posts: this.props.initialData
    }
  },
  render: function() {
    // filter the pages out of the posts to get just the blogs
    var posts = _.chain(this.state.posts).where(function(post){return !post.meta.Page}).sortBy(function(post){return post.meta.Date}).reverse();

    return <section className="posts">{posts.map(function(post) {
      // generate the datetime
      var m = moment(post.meta.Date);
      var time = post.meta.Date ? <time dateTime={m.format("YYYY-MM-DD")}>{m.format("MMMM Do YYYY")}</time> : undefined;
      return <div className="post" key={post.meta.slug}>
        <h2><Link to="post" params={{slug:post.meta.slug}}>{post.meta.Title}</Link></h2>
        {time}
        <Tags post={post} />
      </div>;
    })}</section>;
  }
});

module.exports = Posts;
