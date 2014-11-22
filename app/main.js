var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var TransitionGroup = React.addons.CSSTransitionGroup;

var _ = require('lodash');
var moment = require('moment');

var Posts = require('./components/post/posts');
var Post = require('./components/post/post');

_.remove(app_initial_data, function(post) {return post.meta.Draft});

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
    if (post)
      return <Post post={post}/>
    else return <h2>Not found</h2>
  }
});

var MainRoute = React.createClass({
  mixins: [ Router.State ],
  render: function() {
    var route = this.getRoutes().reverse()[0];
    var key = JSON.stringify(route)+JSON.stringify(this.getParams());
    //console.log(key);
    return <div><TransitionGroup transitionName="example"><RouteHandler key={key} /></TransitionGroup></div>
  }
});

var routes = <Route handler={MainRoute}>
  <DefaultRoute handler={PostsRoute} name="index" />
  <Route handler={PostRoute} name="post" path=":slug" />
</Route>;

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementsByTagName('main')[0]);
});
