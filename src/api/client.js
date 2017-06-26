import feathers from 'feathers/client'
import rest from 'feathers-rest/client'
import hooks from 'feathers-hooks'
import auth from 'feathers-authentication-client'
import superagent from 'superagent'

const host = 'http://localhost:3030'
export const FEATHERS_TOKEN_KEY = 'redyellowgreen'

const feathersClient = feathers()
  .configure(rest(host).superagent(superagent))
  .configure(hooks())
  .configure(auth({
    storage: window.localStorage,
    storageKey: FEATHERS_TOKEN_KEY,
  }))

export default feathersClient
