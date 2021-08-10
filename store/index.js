// application store - Library Code
module.exports.createStore = function (reducer) {
    let state
    let listeners = []

    // getting the state
    const getState = () => state

    // listener
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners => listeners.filter((l) => l !== listener)
        }
    }

    // action to modify the application state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}