import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/homePage';
import About from './components/about/aboutPage';
import Header from './components/common/header';

export default class App extends Component {

  static propTypes = {
    route: PropTypes.string,
  };

  render() {
    let Child;

    switch (this.props.route) {
    case 'about': Child = About; break;
    default: Child = Home;
    }

    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div>
          <Header />
          <Child />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.defaultProps = { route: 'home' };

const renderPage = () => {
  const route = window.location.hash.substr(1);
  ReactDOM.render(<App route={route} />, document.getElementById('app'));
};

window.addEventListener('hashchange', renderPage);

injectTapEventPlugin();
renderPage();
