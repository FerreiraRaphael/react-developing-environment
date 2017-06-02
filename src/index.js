import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import { AppContainer } from 'react-hot-loader';

const renderApp = (Component) => {
  ReactDOM.render(
    /* <Provider store={store}>
      <Router>*/
    <AppContainer>
      <Component />
    </AppContainer>,
    //   </Router>
    // </Provider>,
    document.getElementById('root'));
};

renderApp(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('containers/App', () => renderApp(App));
}
