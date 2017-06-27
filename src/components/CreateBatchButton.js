import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types'


class CreateBatchButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }


  render() {
    const { onChange, signedIn } = this.props
    if (signedIn)
      return (
        <p className="CreateBatchButton">
          <button onClick={ onChange }>
            <Link to={'/create-batch'}>Create a new batch</Link>
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

export default connect(mapStateToProps)(CreateBatchButton)
