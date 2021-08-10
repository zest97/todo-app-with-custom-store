const actionTypes = require('../config/actionTypes')

exports.addTodoActionCreator = function(todo) {
    return {
        type: actionTypes.ADD_TODO,
        todo
    }
}

exports.removeTodoActionCreator = function(id) {
    return {
        type: actionTypes.REMOVE_TODO,
        id
    }
}

exports.toggleTodoActionCreator = function(id) {
    return {
        type: actionTypes.TOGGLE_TODO,
        id
    }
}

exports.addGoalActionCreator = function(goal) {
    return {
        type: actionTypes.ADD_GOAL,
        goal
    }
}

exports.removeGoalActionCreator = function (id) {
    return {
        type: actionTypes.REMOVE_GOAL,
        id
    }
}