var React = require('react/addons');
var _ = require('lodash');
var moment = require('moment');

var Router = require('react-router');
var Tags = require('./tags');
var Link = Router.Link;

var TransitionGroup = React.addons.CSSTransitionGroup;

var PostStore = require('../stores/postStore');


function getPosts() {
  return {
    posts: PostStore.getAllPosts()
  }
}

// Render a list of posts
var Posts = React.createClass({
  getInitialState: function() {
    return getPosts();
  },
  componentWillMount: function() {
    PostStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PostStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getPosts());
  },
  render: function() {
    // filter the pages out of the posts to get just the blogs
    var posts = _.chain(this.state.posts).where(function(post){return !post.meta.Page}).sortBy(function(post){return post.meta.Date}).reverse();

    return <section className="posts"><TransitionGroup transitionName="posts">{posts.map(function(post, i) {
      // generate the datetime
      var m = moment(post.meta.Date);
      var time = post.meta.Date ? <time dateTime={m.format("YYYY-MM-DD")}>{m.format("MMMM Do YYYY")}</time> : undefined;
      return <div className="post" key={post.meta.slug}>
        <h2><Link to="post" params={{slug:post.meta.slug}}>{post.meta.Title}</Link></h2>
        {time}
        <Tags post={post} />
      </div>;
    })}</TransitionGroup></section>;
  }
});

module.exports = Posts;
