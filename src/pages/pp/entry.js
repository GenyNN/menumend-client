/* global __DEV__ */

import App from 'app'
import rootReducer from './rootReducer'
import rootContainer from './rootContainer'
import rootSaga from './rootSaga'

const app = new App('app-root', { rootSaga, rootReducer })
app.render(rootContainer)


if (__DEV__ && module.hot) {

  module.hot.accept('./rootContainer', () => {
    const nextRootContainer = require('./rootContainer').default
    app.replaceContainerHot(nextRootContainer)
  })

  module.hot.accept('./rootReducer', () => {
    const nextRootReducer = require('./rootReducer').default
    app.replaceReducerHot(nextRootReducer)
  })
}
