import API from '../../api'

export const SUBSCRIBED_TO_BATCHES_SERVICE = 'SUBSCRIBED_TO_BATCHES_SERVICE'
export const BATCH_CREATED = 'BATCH_CREATED'
export const BATCH_UPDATED = 'BATCH_UPDATED'
export const BATCH_REMOVED = 'BATCH_REMOVED'

const api = new API()
const batchs = api.service('batches')

export default () => {
  return (dispatch) => {
    batches.on('created', (batch) => { dispatch(createdGame(batch)) })
    batches.on('updated', (batch) => { dispatch(updatedGame(batch)) })
    batches.on('patched', (batch) => { dispatch(updatedGame(batch)) })
    batches.on('removed', (batch) => { dispatch(removedGame(batch)) })

    dispatch({ type: SUBSCRIBED_TO_BATCHES_SERVICE })
  }
}

const createdGame = (batch) => {
  return {
    type: BATCH_CREATED,
    payload: batch
  }
}

const updatedGame = (batch) => {
  return {
    type: BATCH_UPDATED,
    payload: batch
  }
}

const removedGame = (batch) => {
  return {
    type: BATCH_REMOVED,
    payload: batch
  }
}
