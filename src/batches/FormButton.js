import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types'


class FormButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }


  render() {
    const { onChange, signedIn } = this.props
    if (signedIn)
      return (
        <p className="FormButton">
          <button onClick={ onChange }>
            <Link to={'/form'}>Create a new recipe</Link>
          </button>
        </p>
      )
      else {
        return null
      }

  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps)(FormButton)
