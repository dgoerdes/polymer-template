Polymer({
    is: 'a-list',
    behaviors: [ReduxBehavior],
    created() {
        console.log('a list was created', this.getState())
    },
    properties: {
        entries: {
            type: Array,
            statePath: 'entries',
            readOnly: true,
        },
        // entries: {
        //     type: Array,
        //     computed: 'computeState(fromState)',
        // },
    },
    // computeState(text) {
    //     return 'foo + ' + text
    // },
});
