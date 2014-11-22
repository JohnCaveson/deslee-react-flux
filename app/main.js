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
    return <div>
      <header className="header">
        <div className="icon">
          <Link to="index"><img src="assets/fb-250.jpg" /></Link>
        </div>
        <h1><Link to="index">Desmond Lee</Link></h1>
        <p className="intro">This is my personal blog. I'm an undergraduate student at The University of Texas at Dallas studying Software Engineering.</p>
        <div className="follow-icons">
          <a className="follow-icon" href="http://facebook.com/desmondl"><i className="fa fa-facebook-square fa-2x"></i></a>
          <a className="follow-icon" href="http://linkedin.com/in/deslee"><i className="fa fa-linkedin-square fa-2x"></i></a>
          <a className="follow-icon" href="http://github.com/deslee"><i className="fa fa-github-square fa-2x"></i></a>
          <a className="follow-icon" href="mailto:desmond.lee.public@gmail.com"><i className="fa fa-envelope-square fa-2x"></i></a>
        </div>
        <nav className="menu">
          <h6 className="menu-item"><Link to="index">Home</Link></h6>
          <h6 className="menu-item"><Link to="post" params={{slug: 'about'}}>About</Link></h6>
          <h6 className="menu-item"><Link to="post" params={{slug: 'projects'}}>Projects</Link></h6>
        </nav>
      </header>

      <main className="main">
        <TransitionGroup transitionName="example"><RouteHandler key={key} /></TransitionGroup>
      </main>

      <footer className="footer">
        <span>© 2014 Desmond Lee</span>
        <span className="separator"></span>
        <a href="https://github.com/deslee/deslee-react-flux/">Hand crafted.</a>
        <span className="separator"></span>
        <a href="https://github.com/kathyqian/crisp-ghost-theme">Theme.</a>
      </footer>
    </div>
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
  React.render(<Handler/>, document.body);
});
