import React, { PureComponent } from 'react'
import Editor from 'react-medium-editor'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import createBatch from '../actions/batches/create'
import { showError } from '../actions/loading'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import './AddBatch.css'

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


updateEnds(event) {
  event.preventDefault()
  this.setState({
    ends: this.refs.ends.value
  })
}


updateStarts(event) {
  event.preventDefault()
  this.setState({
    starts: this.refs.starts.value
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

    return (
      <div className="editor">
        <input
          type="text"
          ref="number"
          className="number"
          placeholder="Batch Number"
          defaultValue={this.state.number}
          onChange={this.updateNumber.bind(this)} />

        { errors.title && <p className="error">{ errors.number }</p> }

        <input
          type="date"
          ref="starts"
          className="starts"
          placeholder="Start date of this batch"
          defaultValue={this.state.starts}
          onChange={this.updateStarts.bind(this)} />

        { errors.starts && <p className="error">{ errors.starts }</p> }

        <input
          type="date"
          ref="ends"
          className="ends"
          placeholder="End date of this batch"
          defaultValue={this.state.ends}
          onChange={this.updateEnds.bind(this)} />

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
