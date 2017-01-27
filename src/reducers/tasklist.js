(function (store) {
    const initialState = {
        tasklists: {},
    };

    function nextActionPredicate(state) {
        // Logic to dispatch other actions based on the new state.
    }

    function tasklistReducer(state = initialState, {type, payload = {}}) {
        switch (type) {
            case 'TASKLIST_REGISTER': {
                state.tasklists[payload.id] = {
                    tasks: []
                };
                break;
            }
            case 'TASKLIST_TASK_ADD': {
                state.tasklists[payload.componentId].tasks = _.concat(state.tasklists[payload.componentId].tasks, [payload.task]);
                break;
            }
            case 'TASKLIST_TASK_REMOVE': {
                state.tasklists[payload.componentId].tasks = _.filter(state.tasklists[payload.componentId].tasks, (t) => {
                    return t.id !== payload.taskId;
                });
                break;
            }
            case 'TASKLIST_TASK_PRIO_CHANGE': {
                const task = _.find(state.tasklists[payload.componentId].tasks, {id: payload.taskId});
                if (_.get(task, 'status') === 'done') break;

                state.tasklists[payload.componentId].tasks = _.map(state.tasklists[payload.componentId].tasks, (t) => {
                    if (t.id === payload.taskId) {
                        t.priority += payload.priorityDiff;
                    }
                    return t;
                });
                break;
            }
            case 'TASKLIST_TASK_DONE': {
                state.tasklists[payload.componentId].tasks = _.map(state.tasklists[payload.componentId].tasks, (t) => {
                    if (t.id === payload.taskId) {
                        t.status = 'done';
                    }
                    return t;
                });
                break;
            }
        }

        setImmediate(() => {
            nextActionPredicate(state);
        });

        return state;
    }

    _.set(window, 'reducers.tasklist', tasklistReducer);

}(window.store));
