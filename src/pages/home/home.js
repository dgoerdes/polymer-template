Polymer({
    is: 'home-page',
    behaviors: [ReduxBehavior],
    created() {
        console.log('home was created', this.getState())
    },
    properties: {
        who: {
            type: String,
            value: 'World'
        },
        fromState: {
            type: String,
            statePath: 'text',
            readOnly: true,
        },
        compState: {
            type: String,
            computed: 'computeState(fromState)',
        },
    },
    computeState(text) {
        return 'foo + ' + text
    },
});
