Polymer({
    is: 'dg-task',

    behaviors: [ ReduxBehavior ],

    extends: 'li',

    properties: {
        id: Number,
        parentId: Number,
        name: String,
        priority: {
            type: Number,
            statePath: function (state) {
                return this._getItemProperty(state, 'priority');
            }
        },
        status: {
            type: String,
            statePath: function (state) {
                return this._getItemProperty(state, 'status');
            }
        },
        isTaskDone: {
            type: Boolean,
            computed: '_isTaskDone(status)'
        }
    },

    actions: {
        changePriority(diff) {
            return {
                type: 'TASKLIST_TASK_PRIO_CHANGE',
                payload: {
                    componentId: this.parentId,
                    taskId: this.id,
                    priorityDiff: diff
                }
            };
        },

        closeTask() {
            const type = (this.status === 'open') ? 'TASKLIST_TASK_DONE' : 'TASKLIST_TASK_REMOVE';

            return {
                type,
                payload: {
                    componentId: this.parentId,
                    taskId: this.id
                }
            };
        }
    },

    _getItemProperty(state, property) {
        const item = _.find(state.tasklist.tasklists[this.parentId].tasks, {id: this.id});
        return _.get(item, property);
    },

    _isTaskDone: function (status) {
        return status === 'done';
    },

    higherPriority: function (event) {
        this.dispatch('changePriority', 1);
    },

    lowerPriority: function (event) {
        this.dispatch('changePriority', -1);
    },

    removeTask: function (event) {
        this.dispatch('closeTask');
    }
});
