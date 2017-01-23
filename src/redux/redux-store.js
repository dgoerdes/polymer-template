const initialState = {
  text: 'initial-value',
  entries: ['foo', 'bar', 'baz'],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_ENTRIES':
      const willUpdate = Math.random() >= 0.5;
      console.log('update entries in reducer?', action.value, willUpdate);
      if (willUpdate) {
        const index = Math.round(Math.random() * 2);
        const value = `${parseFloat(`${Math.random()}`).toFixed(3)}`;
        return R.assocPath(['entries'], R.update(index, value, state.entries), state);
      }
      break;
  }
  return state;
}

const store = Redux.createStore(reducer);

window.ReduxBehavior = PolymerRedux(store);

console.log('redux-store', window.ReduxBehavior);
