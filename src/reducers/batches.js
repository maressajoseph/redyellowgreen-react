import { FETCHED_BATCHES } from '../actions/batches/fetch'
import { ADD_STUDENT } from '../actions/batches/add-student'
import { ADD_EVALUATION} from '../actions/batches/add-evaluation'
import { ADD_NEXT_EVALUATION} from '../actions/batches/addnext-evaluation'
import { DELETE_STUDENT } from '../actions/batches/delete-student'
import { EDIT_STUDENT } from '../actions/batches/edit-student'
import { EDIT_EVALUATION } from '../actions/batches/edit-evaluation'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_BATCHES :
      return [].concat(payload)

    case ADD_STUDENT :
      return [].concat(payload)

    case ADD_EVALUATION :
      return [].concat(payload)

    case ADD_NEXT_EVALUATION :
      return [].concat(payload)

    case EDIT_STUDENT :
      return [].concat(payload)

    case DELETE_STUDENT :
      return [].concat(payload)

    case EDIT_EVALUATION :
      return [].concat(payload)

    default :
      return state
  }
}
