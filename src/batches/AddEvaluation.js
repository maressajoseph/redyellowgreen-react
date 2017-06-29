import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { history } from '../store'
import addEvaluation from '../actions/batches/add-evaluation'
import addNextEvaluation from '../actions/batches/addnext-evaluation'
import { showError } from '../actions/loading'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'

const COLORS = [
  'Red',
  'Yellow',
  'Green'
]

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
    this.setState({
      day: this.refs.day.value
    })
  }

  updateRemark(event) {
    this.setState({
      remark: this.refs.remark.value
    })
  }

  setType(event) {
  this.setState({
    color: event.target.value
  })
}


  validate(evaluation) {
    const { day, color } = evaluation

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

    const { currentBatch } = this.props

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
    let indexthis = students.findIndex((student) => (student._id === studentid))

    const nextStudents = () => {
      if ((indexthis + 1) > (students.length - 1)) {
        return students[indexthis]
      }
      else {
        return students[indexthis + 1]
      }
    }

    const nextStudent = nextStudents()

    if (this.validate(evaluation)) {
      this.props.addNextEvaluation(currentBatch._id, evaluation, nextStudent._id)
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
          onChange={this.updateDay.bind(this)} /><br />

        { errors.day && <p className="error">{ errors.day }</p> }

        {COLORS.map((color) => {
          return <label key={color} htmlFor={color}>
            <input id={color} type="radio" name="color" value={color} onChange={this.setType.bind(this)} />
            {color}
          </label>
        })}<br />

        <input
            type="text"
            ref="remark"
            className="remark"
            placeholder="Write your remark here"
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
export default connect(mapStateToProps, { addEvaluation, addNextEvaluation, showError })(AddEvaluation)
