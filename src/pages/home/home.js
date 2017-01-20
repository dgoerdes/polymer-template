Polymer({
    is: 'home-page',
    properties: {
        who: {
            type: String,
            value: 'World'
        },
        fromState: {
            linkState: 'state.text'
        },
    },
    behaviors: [Redux.StateReceiverBehavior]
});
