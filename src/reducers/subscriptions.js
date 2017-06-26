import { SUBSCRIBED_TO_BATCHES_SERVICE } from '../actions/batches/subscribe'

export default (state = [], { type } = {}) => {
  switch (type) {
    case SUBSCRIBED_TO_BATCHES_SERVICE :
      return state.concat('batches')

    default :
      return state
  }
}
