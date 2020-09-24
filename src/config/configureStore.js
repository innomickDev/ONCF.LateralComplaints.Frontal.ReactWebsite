import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from '../reducers'
import { default as ReduxThunk } from 'redux-thunk';

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    
    {},
    applyMiddleware(
      
     // swaggerClient({url:'http://petstore.swagger.io/v2/swagger.json'}),
      ReduxThunk
    )
  );
}