import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/rootReducer'
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux'

const loggerMiddleware = createLogger()
export const history = createHistory({
  basename: '/~j150989k'
})

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      routerMiddleware(history)
    )
  )
}
