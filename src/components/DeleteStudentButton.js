import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import RaisedButton from 'material-ui/RaisedButton'
import deleteStudent from '../actions/batches/delete-student'


class DeleteStudentButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  byeStudent() {
    const { currentBatch } = this.props

    this.props.deleteStudent(currentBatch._id, currentBatch.students)
  }


  render() {
    const { signedIn } = this.props
    if (signedIn)
      return (
          <RaisedButton onClick={ this.byeStudent.bind(this) } icon={<DeleteIcon/>} label="Delete this student"/>
      )
      else {
        return null
      }

  }
}

const mapStateToProps = ({ currentUser, currentBatch }) => ({
  signedIn: !!currentUser && !!currentUser._id,
  currentBatch
})

export default connect(mapStateToProps, { deleteStudent })(DeleteStudentButton)
