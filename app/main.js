var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var TransitionGroup = React.addons.CSSTransitionGroup;

var _ = require('lodash');
var moment = require('moment');

var Posts = require('./components/post/posts');
var Post = require('./components/post/post');

_.remove(app_initial_data, function(post) {return post.meta.Draft});

var PostsHandler = React.createClass({
  render: function() {
    return <Posts initialData={app_initial_data}/>
  }
});

var MainHandler = React.createClass({
  mixins: [ Router.State ],
  render: function() {
    var route = this.getRoutes().reverse()[0];
    var key = JSON.stringify(route)+JSON.stringify(this.getParams());
    //console.log(key);
    return <div><TransitionGroup transitionName="example"><RouteHandler key={key} /></TransitionGroup></div>
  }
});

var NotFound = React.createClass({
  render: function() {
    return <h2>Not found</h2>
  }
});

var PostHandler = React.createClass({
  mixins: [Router.State],
  render: function() {
    var slug = this.getParams().slug;
    var post = _.find(app_initial_data, {meta:{slug: slug}});
    if (post)
      return <Post post={post}/>;
    else return <NotFound />
  }
});

var NotFoundHandler = React.createClass({
  render: function() {
    return <NotFound />
  }
});

var routes = <Route handler={MainHandler} location="history">
  <DefaultRoute handler={PostsHandler} name="index" />
  <Route handler={PostHandler} name="post" path=":slug" />
  <NotFoundRoute handler={NotFoundHandler}/>
</Route>;

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.getElementsByTagName('main')[0]);
});
