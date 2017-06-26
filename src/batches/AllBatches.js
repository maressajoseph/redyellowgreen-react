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
  }

  componentWillMount() {
    this.props.fetchBatches()
    const { subscribed } = this.props
    if (!subscribed) this.props.subscribeToBatchesService()
  }


  renderBatch(batch, index) {
    return <Batch key={index} { ...batch }  />
  }

  render() {
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
}

const mapStateToProps = ({ currentUser, currentBatch, batches, subscriptions }) => ({ currentUser, currentBatch, batches, subscribed: subscriptions.includes('batches') })

export default connect(mapStateToProps, {
  fetchBatches, subscribeToBatchesService
})(AllBatches)
