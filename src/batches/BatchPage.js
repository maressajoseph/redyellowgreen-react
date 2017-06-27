import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchBatch from '../actions/batches/fetch'

export class BatchPage extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    starts: PropTypes.instanceOf(Date).isRequired,
    ends: PropTypes.instanceOf(Date).isRequired,
    students: PropTypes.array,
  }

  componentWillMount() {
    this.props.fetchBatch()
  }

  renderStudents(student, index) {
    console.log(student)
    return (
      <div key={index} className="student">
        {student.name && <h3>{student.name}</h3>}
        {student.photo && <img src={student.photo} />}
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
        </header>
        <main>
          {students.map(this.renderStudents)}
        </main>
      </article>
    )
  }
}

const mapStateToProps = ({ batches }, { params }) => {
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

export default connect(mapStateToProps, { fetchBatch })(BatchPage)
