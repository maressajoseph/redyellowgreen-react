import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchBatches from '../actions/batches/fetch'
import Batch from './Batch'
import subscribeToBatchesService from '../actions/batches/subscribe'
import CreateBatchButton from '../components/CreateBatchButton'
import './AllBatches.css'


export class AllBatches extends PureComponent {
  static propTypes = {
    batches: PropTypes.array.isRequired,
    fetchBatches: PropTypes.func.isRequired,
    subscribeToBatchesService: PropTypes.func.isRequired,
    signedIn: PropTypes.bool,
  }

  componentWillMount() {
    const { subscribed } = this.props
    this.props.fetchBatches()
    if (!subscribed) this.props.subscribeToBatchesService()
  }


  renderBatch(batch, index) {
    return <Batch key={index} { ...batch }  />
  }

  render() {
    if (this.props.signedIn) {
      return (
        <div>
          <main>
            { this.props.batches.map(this.renderBatch.bind(this)) }
            <CreateBatchButton />
          </main>
        </div>
      )
    }
    return (
      <div>
        <h1 className="welcome">Welcome to REDYELLOWGREEN</h1>
        <h2 className="welcome">Please sign in to continue</h2>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentBatch, batches, subscriptions }) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  currentBatch,
  batches })

export default connect(mapStateToProps, {
  fetchBatches, subscribeToBatchesService
})(AllBatches)
