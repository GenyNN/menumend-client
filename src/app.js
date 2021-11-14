/* global __DEV__ */
import "regenerator-runtime/runtime"

import React from 'react'
import { render } from 'react-native'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { AppContainer as ReactHotLoaderWrapper } from 'react-hot-loader'


export class App {

  static config
  static rootElementId

  constructor(rootElementId, options) {
    this.rootElementId = rootElementId
    this.configure(options)
  }

  configure({ rootSaga, rootReducer }) {
    const sagaMiddleware = createSagaMiddleware()
    let storeEnhancer = applyMiddleware(thunk, sagaMiddleware)
      if (window.devToolsExtension) {
        storeEnhancer = compose(storeEnhancer, window.devToolsExtension())
      }

    const preloadedState = undefined
    const store = createStore(rootReducer, preloadedState, storeEnhancer)

    let sagaTask
    if (rootSaga) {
      sagaTask = sagaMiddleware.run(rootSaga)
    }

    this.config = {
      store,
      saga: {
        root: rootSaga,
        task: sagaTask,
        middleware: sagaMiddleware,
      },
    }
  }

  unmount() {
    const rootElement = document.getElementById(this.rootElementId)
    ReactDOM.unmountComponentAtNode(rootElement)
  }

  render(TargetComponent) {
    let ApplicationContainer
    const Application = (props) => (
      <Provider store={this.config.store}>
        <TargetComponent />
      </Provider>
    )
    if (__DEV__) {
      ApplicationContainer = (
        <ReactHotLoaderWrapper warnings={false}>
          <Application />
        </ReactHotLoaderWrapper>
      )
    } else {
      ApplicationContainer = (<Application />)
    }

    const rootElement = document.getElementById(this.rootElementId)
    render(ApplicationContainer, rootElement)
  }

  replaceSagaHot(nextRootSaga) {
    this.config.saga.task.cancel()
    this.config.saga.task.done.then(() => {
      this.config.saga.task = this.config.saga.middleware.run(nextRootSaga)
      this.config.saga.root = nextRootSaga
    })
  }

  replaceContainerHot(nextContainer) {
    this.unmount()
    this.render(nextContainer)
  }

  replaceReducerHot(nextRootReducer) {
    this.config.store.replaceReducer(nextRootReducer)
  }

}

export default App
