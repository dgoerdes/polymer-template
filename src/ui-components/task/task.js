Polymer({
    is: 'dg-task',

    extends: 'li',

    properties: {
        id: Number,
        name: String,
        priority: {
            type: Number,
            notify: true,
            reflectToAttribute: true
        },
        status: {
            type: String,
            notify: true,
            reflectToAttribute: true
        }
    },

    higherPriority: function(event) {
        this.priority++
    },

    lowerPriority: function(event) {
        this.priority--
    },

    removeTask: function(event) {
        this.fire('task:removed', {taskId: this.id});
    }
});
