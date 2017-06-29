import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
import './Batch.css'

export class Batch extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    starts: PropTypes.instanceOf(Date).isRequired,
    ends: PropTypes.instanceOf(Date).isRequired,
    students: PropTypes.array,
  }


  render() {
    const {
      _id,
      number,
      starts,
      ends,
    } = this.props

    return(
      <article className="batches">
        <header className="batch">
          <h1>
            <Link className="link" to={`/batches/${_id}`}>Batch { number }</Link>
          </h1>
          <p className="starts">{ moment(starts).format('Do MMMM YYYY') } - { moment(ends).format('Do MMMM YYYY') }</p>
        </header>
      </article>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser })

export default connect(mapStateToProps)(Batch)
