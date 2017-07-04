import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = ({ store, routes }: { store: Object, routes: Object }) => {
  if (process.env.NODE_ENV === 'development') {
    const { AppContainer } = require('react-hot-loader');

    return (
      <AppContainer>
        <Provider key="provider" store={store}>
          <MuiThemeProvider>
            {routes}
          </MuiThemeProvider>
        </Provider>
      </AppContainer>
    );
  }

  return (
    <Provider key="provider" store={store}>
      <MuiThemeProvider>
        {routes}
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
