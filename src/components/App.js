import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Header from './common/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import muiCustomTheme from './muiCustomTheme';

injectTapEventPlugin();

class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={muiCustomTheme}>
        <div className="container-fluid">
          <Header />
          <div className="panel panel-default">
            <div className="panel-body">
              {this.props.children}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
