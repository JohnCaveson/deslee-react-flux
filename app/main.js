var React = require('react/addons');
var Router = require('react-router');
var moment = require('moment');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var TransitionGroup = React.addons.CSSTransitionGroup;

var _ = require('lodash');
var moment = require('moment');

var Posts = require('./components/posts');
var Post = require('./components/post');
var NotFound = require('./components/notFound');

var PostStore = require('./stores/postStore');



// basically a duplicate of the body, with reactified elements.
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
        <TransitionGroup transitionName="route"><RouteHandler key={key} /></TransitionGroup>
      </main>

      <footer className="footer">
        <span>© {moment().format('YYYY')} Desmond Lee</span>
        <span className="separator"></span>
        <a href="https://github.com/deslee/deslee-react-flux/">Source.</a>
      </footer>
    </div>
  }
});

var PostsHandler = React.createClass({
  render: function() {
    return <Posts />
  }
});

var PostHandler = React.createClass({
  mixins: [Router.State],
  componentWillMount: function() {
    PostStore.addChangeListener(this._postStoreUpdated);
  },
  componentWillUnmount: function() {
    PostStore.removeChangeListener(this._postStoreUpdated);
  },
  _postStoreUpdated: function() {
    this.forceUpdate();
  },
  render: function() {
    var slug = this.getParams().slug;
    var post = _.find(PostStore.getAllPosts(), {meta:{slug: slug}});
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

var TagsHandler = React.createClass({
  mixins: [Router.State],
  render: function() {
    return <Posts tags={this.getParams().tags} />
  }
});

var routes = <Route handler={MainHandler} location="history">
  <DefaultRoute handler={PostsHandler} name="index" />
  <Route handler={PostHandler} name="post" path=":slug" />
  <Route handler={TagsHandler} name="tags" path="tags/:tags" />
  <NotFoundRoute handler={NotFoundHandler}/>
</Route>;

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});

var actions = require('./actions/postActions');
metadata.forEach(function(meta) {
  actions.receivedMetadata(meta)
});
