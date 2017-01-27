window.store = Redux.createStore(Redux.combineReducers(window.reducers), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.ReduxBehavior = PolymerRedux(window.store);
