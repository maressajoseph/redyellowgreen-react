import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import getCurrentBatch from '../actions/batches/get'
import AddEvaluation from './AddEvaluation'
import DeleteStudent from '../components/DeleteStudentButton'

export class StudentPage extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    students: PropTypes.array,
  }

  componentWillMount() {
    const { _id } = this.props
    const { getCurrentBatch } = this.props
    getCurrentBatch(_id)
  }

  renderEvaluations(evaluation, index) {
    return (
      <div key={index} className="evaluation">
        <div className={`${evaluation.color === 'Red' ? 'red' : (evaluation.color === 'Yellow' ? 'yellow' : 'green')}`}></div>
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
          <Avatar src={student.photo} />
          <h2>{student.name}</h2>
          <DeleteStudent />
          <button className="EditStudentButton">
            <Link to={`/edit-student/${student._id}`}>Edit student</Link>
          </button>
          <p>Evaluation history: </p>
          {student.evaluation.map(this.renderEvaluations.bind(this))}
          <Link to={`/edit-evaluation/${student._id}`}>Edit your last evaluation</Link>
          <AddEvaluation />
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
