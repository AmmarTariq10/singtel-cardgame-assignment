import thunk from 'redux-thunk';
import Reducers from './Reducers';
import { createStore, applyMiddleware } from 'redux'
export const store = createStore(Reducers, applyMiddleware(thunk));