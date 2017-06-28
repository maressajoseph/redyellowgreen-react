import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import getCurrentBatch from '../actions/batches/get'

export class StudentPage extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    students: PropTypes.array,
  }

  componentWillMount() {
    const { _id, students } = this.props
    const { getCurrentBatch, currentBatch } = this.props
    getCurrentBatch(_id)
  }

  renderEvaluations(evaluation, index) {
    return (
      <div key={index} className="evaluation">
        <h3>{evaluation.day}</h3>
        <h3>{evaluation.color}</h3>
        <h3>{evaluation.remark}</h3>
      </div>
    )
  }

  render() {
    const {
      _id,
      students,
    } = this.props

    const student = students.find((student) => (student._id === this.props.params.studentId))

    if (!_id) return null

    return(
      <article className="student page">
        <main>
          {student.name}
          {student.photo}
          {student.evaluation.map(this.renderEvaluations.bind(this))}
        </main>
      </article>
    )
  }
}


const mapStateToProps = ({ batches, currentBatch }, { params }) => {

  const batch = batches.reduce((prev, next) => {
    if (next._id === params.batchId) {
      return next
    }
    return prev
  }, {})

  return {
    ...currentBatch,
  }
}

export default connect(mapStateToProps, { getCurrentBatch })(StudentPage)
