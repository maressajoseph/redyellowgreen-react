import React, { PureComponent } from 'react'
import Editor from 'react-medium-editor'
import { connect } from 'react-redux'
import addEvaluation from '../actions/batches/add-evaluation'
import { showError } from '../actions/loading'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'

class AddEvaluation extends PureComponent {
  constructor(props) {
    super()

    const { day, color, remark } = props

    this.state = {
      day,
      color,
      remark,
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


  updateDay(event) {
    event.preventDefault()
    this.setState({
      day: this.refs.day.value
    })
  }


  updateColor(event) {
    event.preventDefault()
    this.setState({
      color: this.refs.color.value
    })
  }

  updateRemark(event) {
    event.preventDefault()
    this.setState({
      remark: this.refs.remark.value
    })
  }


  validate(evaluation) {
    const { day, color, remark } = evaluation

    let errors = {}

    if (!day || day === '') errors.day = "Please add a day of the evaluation"
    if (!color || color === '') errors.color = 'Please add a color for this evaluation'

    this.setState({
      errors,
    })

    return Object.keys(errors).length === 0
  }

  saveEvaluation() {
    const {
      day,
      color,
      remark,
    } = this.state

    const evaluation = {
      day,
      color,
      remark,
    }

    const { currentBatch, student } = this.props

    if (this.validate(evaluation)) {
      this.props.addEvaluation(currentBatch._id, evaluation)
    }
  }

  savenextEvaluation() {
    const {
      day,
      color,
      remark,
    } = this.state

    const evaluation = {
      day,
      color,
      remark,
    }

    const { currentBatch } = this.props
    const { students } = currentBatch
    const url = this.props.routing.locationBeforeTransitions.pathname
    const studentid = url.split('/').pop()
    const thisStudent = students.filter((student) => (student._id.toString() === studentid))
    const indexstudent = students.filter((student, index) => {
      if (student._id.toString() === studentid) {
      return index
      }
    })

    console.log(thisStudent)
    console.log(indexstudent)

    if (this.validate(evaluation)) {
      this.props.addEvaluation(currentBatch._id, evaluation)
    }
  }

  render() {
    const { errors } = this.state

    return (
      <div className="editor">
        <input
          type="date"
          ref="day"
          className="day"
          placeholder="Day of the evaluation"
          onChange={this.updateDay.bind(this)} />

        { errors.day && <p className="error">{ errors.day }</p> }

        <input
            type="text"
            ref="color"
            className="color"
            placeholder="Color of the evaluation, red, yellow or green?"
            onChange={this.updateColor.bind(this)} />

          { errors.color && <p className="error">{ errors.color }</p> }

        <input
            type="text"
            ref="remark"
            className="remark"
            placeholder="Remark"
            onChange={this.updateRemark.bind(this)} />

        <div className="actions">
          <button className="primary" onClick={this.saveEvaluation.bind(this)}>Save</button>
          <button className="primary" onClick={this.savenextEvaluation.bind(this)}>Save & Next</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentBatch, routing}) => ({
  signedIn: !!currentUser && !!currentUser._id,
  currentBatch,
  routing
})
export default connect(mapStateToProps, { addEvaluation, showError })(AddEvaluation)
