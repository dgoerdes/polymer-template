Polymer({
    is: 'redux-behavior',
    properties: {
        state: {
            type: Object,
            value: {
                text: 'initial value'
            }
        }
    },
    behaviors: [Redux.StateProviderBehavior]
});
