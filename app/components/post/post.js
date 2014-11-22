var React = require('react/addons');

var marked = require('meta-marked');
var $ = require('jquery');

/**
 * Renders a loading component
 */
var MarkdownPostLoading = React.createClass({
  render: function() {
    return <div>Loading</div>
  }
});

/**
 * Renders a Markdown post
 */
var MarkdownPost = React.createClass({
  getInitialState: function() {
    return {
    }
  },
  componentDidMount: function() {
    $.get(this.props.src+'.md', function(result) {
      var post = marked(result);
      this.setState({
        title: post.meta.Title,
        html: post.html
      });

    }.bind(this));
  },
  componentDidUpdate: function() {
  },
  render: function() {

    /*
     If state.html hasn't come in yet, then render a MarkdownPostLoading instead.
     */
    var markdownBlock =
      this.state.html ?
        <div>
          <h1>{this.state.title}</h1>
          <div className="insertMarkdown" dangerouslySetInnerHTML={{__html: this.state.html}}></div>
        </div> :
        <MarkdownPostLoading />;

    return markdownBlock
  }
});
