import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'

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
      <article className="batch">
        <header>
          <h1>
            <Link to={`/batches/${_id}`}>Batch { number }</Link>
          </h1>
          <p className="starts">Starts: { starts }</p>
          <p className="ends">Starts: { ends }</p>
        </header>
      </article>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser })

export default connect(mapStateToProps)(Batch)
