import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import DatePicker from 'material-ui/DatePicker'
import createBatch from '../actions/batches/create'
import { showError } from '../actions/loading'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import './AddBatch.css'

const Calendarstart = () => (
  <div>
    <DatePicker hintText="Start date of the batch" okLabel="Pick date" container="inline" onChange={(x, event) => this.updateStarts(x, event)} />
  </div>
)

const Calendarend = () => (
  <div>
    <DatePicker hintText="End date of the batch" okLabel="Pick date" container="inline" onChange={(x, event) => this.updateEnds(x, event)} />
  </div>
)

class AddBatch extends PureComponent {
  constructor(props) {
    super()

    const { number, starts, ends, students } = props

    this.state = {
      number,
      starts,
      ends,
      students,
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


updateEnds(event, x) {
  this.setState({
    ends: x
  })
}


updateStarts(event, x) {
  this.setState({
    starts: x
  })
}

  updateNumber(event) {
    event.preventDefault()
    this.setState({
      number: this.refs.number.value
    })
  }


  validate(batch) {
    const { number, starts, ends } = batch

    let errors = {}

    if (!number || number === '') errors.number = "Please add the number of this batch"
    if (!starts || starts === '') errors.starts = 'The batch needs a starting date'
    if (!ends || ends === '') errors.ends = 'The batch needs an end date!'

    this.setState({
      errors,
    })

    return Object.keys(errors).length === 0
  }

  saveBatch() {
    const {
      number,
      starts,
      ends,
      students
    } = this.state

    const batch = {
      number,
      starts,
      ends,
      students
    }

    if (this.validate(batch)) {
      this.props.createBatch(batch)
    }
  }

  render() {
    const { errors } = this.state

    console.log(Calendarstart)

    return (
      <div className="editor">
        <input
          type="text"
          ref="number"
          className="number"
          placeholder="Batch Number"
          onChange={this.updateNumber.bind(this)} />

        { errors.title && <p className="error">{ errors.number }</p> }

        <DatePicker hintText="Start date of the batch" okLabel="Pick date" container="inline" onChange={(event, x) => this.updateStarts(event, x)} />

        { errors.starts && <p className="error">{ errors.starts }</p> }

        <DatePicker hintText="End date of the batch" okLabel="Pick date" container="inline" onChange={(event, x) => this.updateEnds(event, x)} />

        { errors.ends && <p className="error">{ errors.ends }</p> }

        <div className="actions">
          <button className="primary" onClick={this.saveBatch.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})
export default connect(mapStateToProps, { createBatch, replace, showError })(AddBatch)
