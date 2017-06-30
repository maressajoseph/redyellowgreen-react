import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import AddIcon from 'material-ui/svg-icons/social/person-add'
import RaisedButton from 'material-ui/RaisedButton'
import { history } from '../store'
import './AddStudentButton.css'


class AddStudentButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  goAddStudent = () => {
    history.push('/add-student')
  }


  render() {
    const { signedIn } = this.props
    if (signedIn)
      return (
        <RaisedButton primary={true} className="AddStudentButton" icon={<AddIcon/>} onClick={this.goAddStudent} />
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
