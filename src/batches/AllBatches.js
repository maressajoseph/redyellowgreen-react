import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import fetchBatches from '../actions/batches/fetch'
import Batch from './Batch'
import subscribeToBatchesService from '../actions/batches/subscribe'
import CreateBatchButton from '../components/CreateBatchButton'


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
          <header>
            <CreateBatchButton />
          </header>
          <main>
            { this.props.batches.map(this.renderBatch.bind(this)) }
          </main>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = ({ currentUser, currentBatch, batches, subscriptions }) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  currentBatch,
  batches,
  subscribed: subscriptions.includes('batches') })

export default connect(mapStateToProps, {
  fetchBatches, subscribeToBatchesService
})(AllBatches)
