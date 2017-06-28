import API from '../../api'

export const SUBSCRIBED_TO_BATCHES_SERVICE = 'SUBSCRIBED_TO_BATCHES_SERVICE'
export const BATCH_CREATED = 'BATCH_CREATED'
export const BATCH_UPDATED = 'BATCH_UPDATED'
export const BATCH_REMOVED = 'BATCH_REMOVED'
export const BATCH_FOUND = 'BATCH_FOUND'

const api = new API()
const batches = api.service('batches')

export default () => {
  return (dispatch) => {
    batches.on('created', (batch) => { dispatch(createdBatch(batch)) })
    batches.on('find', (batch) => { dispatch(findBatch(batch)) })
    batches.on('updated', (batch) => { dispatch(updatedBatch(batch)) })
    batches.on('patched', (batch) => { dispatch(updatedBatch(batch)) })
    batches.on('removed', (batch) => { dispatch(removedBatch(batch)) })

    dispatch({ type: SUBSCRIBED_TO_BATCHES_SERVICE })
  }
}

const createdBatch = (batch) => {
  return {
    type: BATCH_CREATED,
    payload: batch
  }
}

const findBatch = (batch) => {
  return {
    type: BATCH_FOUND,
    payload: batch
  }
}

const updatedBatch = (batch) => {
  return {
    type: BATCH_UPDATED,
    payload: batch
  }
}

const removedBatch = (batch) => {
  return {
    type: BATCH_REMOVED,
    payload: batch
  }
}
