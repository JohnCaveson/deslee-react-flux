var React = require('react/addons');
var moment = require('moment');

var PostList = React.createClass({
  getInitialState: function() {
    return {
      posts: this.props.initialData
    }
  },
  render: function() {
    // filter the pages out of the posts to get just the blogs
    return <section className="posts">{this.state.posts.filter(function(post){return !post.meta.Page}).map(function(post) {
      // generate the datetime
      var m = moment(post.meta.Date);
      var time = post.meta.Date ? <time dateTime={m.format("YYYY-MM-DD")}>{m.format("MMMM Do YYYY")}</time> : undefined;
      return <div className="post">
        <h2><a href="">{post.meta.Title}</a></h2>
        {time}
        <span className="tags">
          <a href="">firebase</a>
          <a href="">react</a>
          <a href="">dev</a>
        </span>
      </div>;
    })}</section>;
  }
});

React.render(<PostList initialData={window.app_initial_data} />, document.getElementsByTagName('main')[0]);
