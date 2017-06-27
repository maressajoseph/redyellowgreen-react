import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AskQuestionButton from '../components/AskQuestionButton'
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
    return (
      <div key={index} className="student">
        {student.name && <h3>{student.name}</h3>}
        {student.photo && <img src={student.photo} />}
        {student.evaluation[0].color && <div className={`red${student.evaluation[0].color === 'Red' ? '' : (student.evaluation[0].color === 'Yellow' ? 'orange': 'green')}`}></div>}
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

    if (!_id) return null

    return(
      <article className="batch page">
        <header>
          <h1>Batch: { number } </h1>
          <p className="starts">Starts: { starts }</p>
          <p className="ends">Ends: { ends }</p>
          <div className="red"></div>
        </header>
        <main>
          {students.map(this.renderStudents)}
        </main>
        <AskQuestionButton />
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
    ...batch
  }
}

export default connect(mapStateToProps, { getCurrentBatch })(BatchPage)
