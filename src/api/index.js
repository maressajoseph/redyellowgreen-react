import client from './client'

// API Client
// -----------------------------------------------------------------------------
// Usage:
// import API from './api'
// const api = new API()
//
// const batches = api.service('batches')
// batches.find()
// batches.create({ title: 'Apple Pie', ... })
//
// See: https://docs.feathersjs.com/api/services.html
//
// The above service calls return a Promise, so to use the response data, you
// will need to write something like:
//
// batches.find()
//   .then((result) => {
//     // result has your data!
//   })
//   .catch((error) => {
//     // optionally catch errors and act on them
//   })
//
class API {
  constructor() {
    this.app = client
  }

  service(serviceName) {
    return this.app.service(serviceName)
  }

  authenticate(user) {
    const { email, password } = user
    return this.app.authenticate({
      strategy: 'local',
      email,
      password,
    })
    .then(response => {
      console.log('Authenticated!', response);
      return this.app.passport.verifyJWT(response.accessToken)
    })
    .then(payload => {
      console.log('JWT Payload', payload);
      return this.app.service('users').get(payload.userId);
    })
  }

  signOut() {
    return this.app.logout()
  }
}

export default API
