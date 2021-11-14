/* global __DEV__ */

import App from 'app'
import rootSaga from './rootSaga'
import rootReducer from './rootReducer'
import rootContainer from './rootContainer'


const app = new App('app-root', { rootSaga, rootReducer })
app.render(rootContainer)


if (__DEV__ && module.hot) {
  module.hot.accept('./rootSaga', () => {
    const nextRootSaga = require('./rootSaga').default
    app.replaceSagaHot(nextRootSaga)
  })

  module.hot.accept('./rootContainer', () => {
    const nextRootContainer = require('./rootContainer').default
    app.replaceContainerHot(nextRootContainer)
  })

  module.hot.accept('./rootReducer', () => {
    const nextRootReducer = require('./rootReducer').default
    app.replaceReducerHot(nextRootReducer)
  })
}
