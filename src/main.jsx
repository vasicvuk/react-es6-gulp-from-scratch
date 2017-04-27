import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Home from './components/homePage';
import About from './components/about/aboutPage';

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
      <div>
        <Child />
      </div>
    );
  }
}

App.defaultProps = { route: 'home' };

const renderPage = () => {
  const route = window.location.hash.substr(1);
  ReactDOM.render(<App route={route} />, document.getElementById('app'));
};

window.addEventListener('hashchange', renderPage);

renderPage();
