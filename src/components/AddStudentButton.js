import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import AddIcon from 'material-ui/svg-icons/social/person-add'
import RaisedButton from 'material-ui/RaisedButton'


class AddStudentButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }


  render() {
    const { signedIn } = this.props
    if (signedIn)
      return (
          <RaisedButton className="AddStudentButton" icon={<AddIcon/>}>
            <Link to={'/add-student'}>Add student</Link>
          </RaisedButton>
      )
      else {
        return null
      }

  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps)(AddStudentButton)
