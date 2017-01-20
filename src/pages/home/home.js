Polymer({
    is: 'home-page',
    behaviors: [ReduxBehavior],
    created() {
        console.log('home state', this.getState())
    },
    properties: {
        who: {
            type: String,
            value: 'World'
        },
        fromState: {
            type: String,
            statePath: 'text'
        },
        compState: {
            type: String,
            computed: 'computeState(fromState)'
        },
    },
    computeState(text) {
        return 'foo + ' + text
    },
});
