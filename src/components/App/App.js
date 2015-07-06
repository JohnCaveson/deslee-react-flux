/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import {addons} from 'react/addons';
import styles from './App.less';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import ContentPage from '../ContentPage';
import ContactPage from '../ContactPage';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';
import TagsPage from '../TagsPage';
import Link from '../../utils/Link';

var TransitionGroup = addons.CSSTransitionGroup;

const pages = { ContentPage, ContactPage, LoginPage, RegisterPage, NotFoundPage, HomePage };
AppStore.init();

@withContext
@withStyles(styles)
class App {

  static propTypes = {
    path: PropTypes.string.isRequired
  };

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.path !== nextProps.path;
  }

  render() {
    let component;
    let page = AppStore.getPage(this.props.path);
    if (page) {
      page.path = this.props.path;
    }
    component = page ? React.createElement(typeof page.component === 'string' ? pages[page.component] : page.component, page) : null;
    return component ? (
      <div>
        <header className="header">
          <div className="icon">
            <a href="/" onClick={Link.handleClick}><img src="face.jpg" /></a>
          </div>
          <h1><a href="/" onClick={Link.handleClick}>Desmond Lee</a></h1>
          <p className="intro">This is my personal blog. I'm an undergraduate student at The University of Texas at Dallas studying Software Engineering.</p>
          <div className="follow-icons">
            <a className="follow-icon" href="http://facebook.com/desmondl"><i className="fa fa-facebook-square fa-2x"></i></a>
            <a className="follow-icon" href="http://linkedin.com/in/deslee"><i className="fa fa-linkedin-square fa-2x"></i></a>
            <a className="follow-icon" href="http://github.com/deslee"><i className="fa fa-github-square fa-2x"></i></a>
            <a className="follow-icon" href="mailto:desmond.lee.public@gmail.com"><i className="fa fa-envelope-square fa-2x"></i></a>
          </div>
          <nav className="menu">
            <h6 className="menu-item"><a href="/" onClick={Link.handleClick}>Home</a></h6>
            <h6 className="menu-item"><a href="/about" onClick={Link.handleClick}>About</a></h6>
            <h6 className="menu-item"><a href="/privacy" onClick={Link.handleClick}>Projects</a></h6>
          </nav>
        </header>
        <main className="main">
          <TransitionGroup transitionName="route"><div key={this.props.path}>{component}</div></TransitionGroup>
        </main>
        <footer className="footer">
          <span>© {2015} Desmond Lee</span>
          <span className="separator"></span>
          <a href="https://github.com/deslee/deslee-react-flux/">Source.</a>
        </footer>
      </div>
    ) : <NotFoundPage />;
  }

  handlePopState(event) {
    AppActions.navigateTo(window.location.pathname, {replace: !!event.state});
  }

}

export default App;
