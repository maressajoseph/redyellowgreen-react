import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../actions/user/sign-out'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Heart from 'material-ui/svg-icons/action/favorite-border'
import FlatButton from 'material-ui/FlatButton'

class Navigation extends PureComponent {
  // ...

  signUp() {
    this.props.push('/sign-up')
  }

  goHome() {
    this.props.push('/')
  }

  render() {
    const { signedIn } = this.props
    return (
      <AppBar
        title="REDYELLOWGREEN"
        iconElementLeft={<IconButton onClick={this.goHome}><Heart /></IconButton>}
        iconElementRight={signedIn ?
          <FlatButton label="Sign out" onClick={this.signOut.bind(this)} /> :
          <FlatButton label="Sign in" onClick={this.signIn} />
        }
      />
    )
  }

const mapStateToProps = // ...

export default connect(mapStateToProps, { push })(Navigation)
