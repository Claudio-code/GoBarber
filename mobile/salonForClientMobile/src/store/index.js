import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import createStore from './createStore';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import persistReducer from './persistReducer';


const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(persistReducer(rootReducer), middleware);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };