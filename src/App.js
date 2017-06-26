import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './assets/styles/theme'
import Navigation from './components/Navigation'
import LoadErrorMessage from './components/LoadErrorMessage'


class App extends PureComponent {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { muiTheme }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Navigation />
          <LoadErrorMessage />
          { this.props.children }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
