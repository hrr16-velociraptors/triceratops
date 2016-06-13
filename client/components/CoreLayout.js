import React from 'react';
import NavBar from '../containers/NavBarContainer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Chat from '../containers/ChatContainer'

export const CoreLayout = ({ children }) => (
  <div>

    <NavBar />
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {children}
    </MuiThemeProvider>
    <Chat />

  </div>
);

export default CoreLayout;
