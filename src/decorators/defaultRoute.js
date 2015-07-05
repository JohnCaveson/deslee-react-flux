import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import DefaultComponents from '../content/DefaultComponents';

function defaultRoute(path) {
  return (ComposedComponent) => {
    DefaultComponents[path] = ComposedComponent;
    return class {
      render() {
        return <ComposedComponent {...this.props} />;
      }
    };
  };
}
export default defaultRoute;
