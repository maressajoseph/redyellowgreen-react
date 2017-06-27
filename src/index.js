import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import SignIn from './users/SignIn'
import AllBatches from './batches/AllBatches'
import BatchPage from './batches/BatchPage'
import AddBatch from './batches/AddBatch'
import './index.css'

injectTapEventPlugin()


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={AllBatches} />
        <Route path="/batches/:batchId" component={BatchPage} />
        <Route path="/create-batch" component={AddBatch} />
        <Route path="/sign-in" component={SignIn} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
