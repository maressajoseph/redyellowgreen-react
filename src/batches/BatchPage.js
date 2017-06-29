import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
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

    return (
      <div key={index} className="student">
        <h3><Link to ={`/batches/${_id}/${student._id}`}>{student.name}</Link></h3>
        {student.photo && <Link to ={`/batches/${_id}/${student._id}`}><img src={student.photo} alt="studentphoto"/></Link>}
        {student.evaluation[0] === undefined ? (<div className="grey"></div>) : (<div className={`${student.evaluation[student.evaluation.length-1].color === 'Red' ? 'red' : (student.evaluation[student.evaluation.length-1].color === 'Yellow' ? 'yellow': 'green')}`}></div>)}
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
      <article className="batch page">
        <header>
          <h1>Batch: { number } </h1>
          <div className='redbar'></div>{redper}%<div className='yellowbar'></div>{yellowper}%<div className='greenbar'></div>{greenper}%
          <p className="starts">Start date: { moment(starts).format('DD-MM-YYYY') }</p>
          <p className="ends">End date: { moment(ends).format('DD-MM-YYYY') }</p>
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
