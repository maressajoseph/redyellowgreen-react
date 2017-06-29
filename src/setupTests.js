import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import store from './store'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock

global.wrapper = (node, nodeContext = {}) => {
  let context = { ...nodeContext, store }

  return mount(
    <Provider store={store}>
      {node}
    </Provider>, { context })
}
