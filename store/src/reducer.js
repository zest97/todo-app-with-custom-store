const actionTypes = require('../config/actionTypes')

// reducer - App Code
function todos(state = [], action) {
    switch(action.type) {
        case actionTypes.ADD_TODO:
            return state.concat([action.todo])
        case actionTypes.REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case actionTypes.TOGGLE_TODO:
            return state.map((todo) => {
                if (todo.id !== action.id) {
                    return todo
                }
                return Object.assign({}, todo, { complete: !todo.complete})
            })
        default:
            return state
    }
}

function goals(state = [], action) {
    switch(action.type) {
        case actionTypes.ADD_GOAL:
            return state.concat([action.goal])
        case actionTypes.REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state
    }
}

exports.app = function(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}