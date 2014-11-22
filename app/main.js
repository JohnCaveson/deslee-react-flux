var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var _ = require('lodash');

_.remove(app_initial_data, function(post) {return post.meta.Draft});

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

var PostsRoute = React.createClass({
  render: function() {
    return <Posts initialData={app_initial_data}/>
  }
});

var PostRoute = React.createClass({
  mixins: [Router.State],
  render: function() {
    var slug = this.getParams().slug;
    var post = _.find(app_initial_data, {meta:{slug: slug}});
    return <Post post={post}/>
  }
});


var MainRoute = React.createClass({
  render: function() {
    return <div><RouteHandler /></div>
  }
});

var routes = <Route handler={MainRoute}>
  <DefaultRoute handler={PostsRoute} />
  <Route handler={PostRoute} name="post" path=":slug" />
</Route>;

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementsByTagName('main')[0]);
});
