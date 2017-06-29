import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { push } from 'react-router-redux'
import addStudent from '../actions/batches/add-student'
import { showError } from '../actions/loading'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'

class AddStudent extends PureComponent {
  constructor(props) {
    super()

    const { name, photo } = props

    this.state = {
      name,
      photo,
      errors: {},
    }
  }

  componentWillReceiveProps(newProps) {
    const { replace, signedIn, showError } = newProps
    if (!signedIn) {
      showError('You need to be signed up to create a new batch!')
      replace('/sign-in')
    }
  }


  updateStudentName(event) {
    event.preventDefault()
    this.setState({
      name: this.refs.studentname.value
    })
  }


  updatePhoto(event) {
    event.preventDefault()
    this.setState({
      photo: this.refs.photo.value
    })
  }


  validate(student) {
    const { name, photo } = student

    let errors = {}

    if (!name || name === '') errors.number = "Please add a name of the student"
    if (!photo || photo === '') errors.starts = 'Please add a f=photo of the student'

    this.setState({
      errors,
    })

    return Object.keys(errors).length === 0
  }

  saveStudent() {
    const {
      name,
      photo
    } = this.state

    const student = {
      name,
      photo
    }
    const { currentBatch } = this.props

    if (this.validate(student)) {
      this.props.addStudent(currentBatch._id, student)
    }
  }

  render() {
    const { errors } = this.state

    return (
      <div className="editor">
        <input
          type="text"
          ref="studentname"
          className="studentname"
          placeholder="Student Name"
          onChange={this.updateStudentName.bind(this)} />

        { errors.students && <p className="error">{ errors.students }</p> }

        <input
            type="text"
            ref="photo"
            className="photo"
            placeholder="Photo URL"
            onChange={this.updatePhoto.bind(this)} />

          { errors.photo && <p className="error">{ errors.photo }</p> }

        <div className="actions">
          <button className="primary" onClick={this.saveStudent.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentBatch }) => ({
  signedIn: !!currentUser && !!currentUser._id,
  currentBatch
})
export default connect(mapStateToProps, { addStudent, replace, showError, push })(AddStudent)
