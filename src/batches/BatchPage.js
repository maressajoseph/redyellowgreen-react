import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import { history } from '../store'
import AskQuestionButton from '../components/AskQuestionButton'
import AddStudentButton from '../components/AddStudentButton'
import getCurrentBatch from '../actions/batches/get'
import './BatchPage.css'

export class BatchPage extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    starts: PropTypes.instanceOf(Date).isRequired,
    ends: PropTypes.instanceOf(Date).isRequired,
    students: PropTypes.array,
  }

  componentWillMount() {
    const { _id } = this.props
    const { getCurrentBatch } = this.props
    getCurrentBatch(_id)
  }

  renderStudents(student, index) {
    const { _id } = this.props

    const gotoStudent = () => {
      history.push(`/batches/${_id}/${student._id}`)
    }

    return (
      <div key={index} className="student">
        <ListItem onClick={gotoStudent} leftAvatar={<Avatar src={student.photo} />}>
          {student.name} {student.evaluation[0] === undefined ? (<div className="grey">{'\u2605'}</div>) : (<div className={`${student.evaluation[student.evaluation.length-1].color === 'Red' ? 'red' : (student.evaluation[student.evaluation.length-1].color === 'Yellow' ? 'yellow': 'green')}`}>{'\u2605'}</div>)}
        </ListItem>
      </div>
    )
  }

  render() {
    const {
      _id,
      number,
      starts,
      ends,
      students,
    } = this.props

    var reds = 0
    var yellows = 0
    var greens = 0

    students.map((student) => {

      if (student.evaluation[0] !== undefined) {
        if (student.evaluation[student.evaluation.length-1].color === 'Red') {
          reds ++
        }
      if (student.evaluation[student.evaluation.length-1].color === 'Yellow') {
          yellows ++
        }
      if (student.evaluation[student.evaluation.length-1].color === 'Green') {
          greens ++
        }
      }
    })

    var redper = (reds / students.length * 100)
    var yellowper = (yellows / students.length * 100)
    var greenper = (greens / students.length * 100)

    if (!_id) return null

    return(
      <article className="batch-page">
        <header>
          <h1 className="batchnumber">Batch number { number } </h1>
          <p className="dates">{ moment(starts).format('Do MMMM YYYY') } - { moment(ends).format('Do MMMM YYYY') } </p>
          <div className="try">
            <div className='redbar'>{'\u2605'} {Math.floor(redper)}%</div><div className='yellowbar'>{'\u2605'} {Math.floor(yellowper)}%</div><div className='greenbar'>{'\u2605'} {Math.floor(greenper)}%</div>
          </div>


        </header>
        <main>
          {students.map(this.renderStudents.bind(this))}
        </main>
        <AskQuestionButton />
        <AddStudentButton />
      </article>
    )
  }
}

const mapStateToProps = ({ batches, currentBatch, currentUser }, { params }) => {

  const batch = batches.reduce((prev, next) => {
    if (next._id === params.batchId) {
      return next
    }
    return prev
  }, {})

  return {
    ...batch
  }
}

export default connect(mapStateToProps, { getCurrentBatch })(BatchPage)
