var React = require('react');

var marked = require('meta-marked');
var $ = require('jquery');

var MarkdownPost = React.createClass({
  getInitialState: function() {
    return {
      title: undefined,
      html: undefined
    }
  },
  componentDidMount: function() {
    $.get(this.props.src+'.md', function(result) {
      var post = marked(result);
      this.setState({
        title: post.meta.Title,
        html: post.html
      })
    }.bind(this))
  },
  componentDidUpdate: function() {
    try {
      // try to resolve the dependency to the optional embedded react component
      var r = require('./'+this.props.src+'.js');

      // try to get the parent component
      var parentComponent = $('.renderHere', '.insertMarkdown', this.getDOMNode())[0];
      if (parentComponent) {
        React.render(React.createFactory(r)(), parentComponent);
      }
    }
    catch(err) {
      // if the error is not about a missing module, print the error
      if (err.message.indexOf('Cannot find module') != 0) {
        console.log(err);
      }
    }
  },
  render: function() {
    return <div className="insertMarkdown" dangerouslySetInnerHTML={{__html: this.state.html}}></div>
  }
});

React.render(<div>
  <MarkdownPost src="posts/test" />
</div>, document.body);
