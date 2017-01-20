const initialState = {text: 'initial-value'};

const reducer = (state = initialState, action) => state;

const store = Redux.createStore(reducer);

window.ReduxBehavior = PolymerRedux(store);

console.log('redux-store', window.ReduxBehavior);
