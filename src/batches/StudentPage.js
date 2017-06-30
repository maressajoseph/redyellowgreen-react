import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import RaisedButton from 'material-ui/RaisedButton'
import ListItem from 'material-ui/List/ListItem'
import getCurrentBatch from '../actions/batches/get'
import AddEvaluation from './AddEvaluation'
import { history } from '../store'
import DeleteStudent from '../components/DeleteStudentButton'
import './StudentPage.css'

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
      <List key={index} className="evaluation">
        <div className={`${evaluation.color === 'Red' ? 'red1' : (evaluation.color === 'Yellow' ? 'yellow1' : 'green1')}`}></div>
      </List>
    )
  }

  render() {
    const {
      _id,
      students,
    } = this.props

    const student = students.find((student) => (student._id === this.props.params.studentId))

    const goToEdit = () => {
      history.push(`/edit-student/${student._id}`)
    }

    const goToEditEva = () => {
      history.push(`/edit-evaluation/${student._id}`)
    }

    if (!_id) return null

    return(
      <article className="student-page">
        <header>
          <Avatar src={student.photo} />
          <h2>{student.name}</h2>
          <DeleteStudent />
          <RaisedButton className="EditStudentButton" primary={true} onClick={goToEdit} label="Edit student" />
        </header>
        <main>
          {student.evaluation.map(this.renderEvaluations.bind(this))}
          <RaisedButton className="EditEvaluationButton" primary={true} onClick={goToEditEva} label="Edit your last evaluation" />
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
