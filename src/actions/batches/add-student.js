import { history } from '../../store'
import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const ADD_STUDENT = 'ADD_STUDENT'

const api = new API()

export default (_id, student) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('batches')

    api.app.authenticate()
      .then(() => {

        backend.patch(_id, { add: student })
          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })

            dispatch({
              type: ADD_STUDENT,
              payload: result
            })
            history.replace(`/batches/${_id}`)
          })
          .catch((error) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({
              type: LOAD_ERROR,
              payload: error.message
            })
          })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
