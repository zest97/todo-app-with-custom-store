const store = require('../store/index')

const reducer = require('../store/src/reducer')

const actions = require('../store/src/actions')

const appStates = store.createStore(reducer.app)

appStates.subscribe(() => {
    console.log('The new state is: ', appStates.getState())
})

appStates.dispatch(
    actions.addTodoActionCreator({
        id: 1,
        name: 'Read a book',
        complete: true
    })
)

appStates.dispatch(
    actions.addTodoActionCreator({
        id: 2,
        name: 'Go to store',
        complete: true
    })
)

appStates.dispatch(
    actions.addGoalActionCreator({
        id: 1,
        name: 'Learn new things',
        complete: false
    })
)

appStates.dispatch(
    actions.addGoalActionCreator({
        id: 2,
        name: 'Learn Redux',
        complete: false
    })
)

appStates.dispatch(
    actions.toggleTodoActionCreator(1)
)

appStates.dispatch(
    actions.removeTodoActionCreator(2)
)

appStates.dispatch(
    actions.removeGoalActionCreator(1)
)