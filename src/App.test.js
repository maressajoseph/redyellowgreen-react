import React from 'react'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import App from './App'
import LoadErrorMessage from './components/LoadErrorMessage'
import Loading from './components/Loading'

chai.use(chaiEnzyme())

describe('<App />', () => {
  const app = wrapper(<App />)

  it('wraps everything in a div tag', () => {
    expect(app).to.have.tagName('div')
  })

  it('contains loading indicators', () => {
    expect(app).to.have.descendants(LoadErrorMessage)
  })
})
