const initialState = {
  text: 'initial-value',
  entries: ['foo', 'bar', 'baz'],
};

const reducer = (state = initialState, action) => state;

const store = Redux.createStore(reducer);

window.ReduxBehavior = PolymerRedux(store);

console.log('redux-store', window.ReduxBehavior);
