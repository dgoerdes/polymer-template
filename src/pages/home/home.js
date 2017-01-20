Polymer({
    is: 'home-page',
    behaviors: [Redux.StateReceiverBehavior],
    properties: {
        who: {
            type: String,
            value: 'World'
        },
        fromState: {
            linkState: 'state.text'
        },
        compState: {
            type: String,
            computed: 'computeState(fromState)'
        }
    },
    computeState(text) {
        return 'foo ' + text
    }
});
