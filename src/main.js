function generateId() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

const createStore = function (reducer) {
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


// reducer - App Code
function todos(state = [], action) {
    switch(action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
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
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state
    }
}

const reducer = function(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}


const addTodoActionCreator = function(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

const removeTodoActionCreator = function(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

const toggleTodoActionCreator = function(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

const addGoalActionCreator = function(goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

const removeGoalActionCreator = function (id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

const appStates = createStore(reducer)

appStates.subscribe(() => {
    const {goals, todos} = appStates.getState()

    document.getElementById('todos').innerHTML = ''
    document.getElementById('goals').innerHTML = ''

    goals.forEach(addGoalToDom)
    todos.forEach(addTodoToDom)
})

// Dom Code
function addTodoOnClick() {
    const input = document.getElementById('todo')
    const name = input.value
    input.value = ''

    appStates.dispatch(
        addTodoActionCreator({
            id: generateId(),
            name,
            complete: false
        })
    )
}
function addGoalOnClick() {
    const input = document.getElementById('goal')
    const name = input.value
    input.value = ''

    appStates.dispatch(
        addGoalActionCreator({
            id: generateId(),
            name,
        })
    )
}

document.getElementById('todoBtn').addEventListener("click", addTodoOnClick);
document.getElementById('goalBtn').addEventListener("click", addGoalOnClick);

function createRemoveButton(onClick) {
    const removeBtn = document.createElement('button')
    removeBtn.innerHTML = 'X'
    removeBtn.addEventListener('click', onClick)
    return removeBtn
}

function addTodoToDom(todo) {
    const node = document.createElement('li')
    const text = document.createTextNode(todo.name)
    node.style.textDecoration = todo.complete ? "line-through" : "none"
    node.addEventListener("click", () => {
        appStates.dispatch(
            toggleTodoActionCreator(todo.id)
        );
    })

    const removeBtn = createRemoveButton(() => {
        appStates.dispatch(
            removeTodoActionCreator(todo.id)
        )
    })

    node.appendChild(text)
    node.appendChild(removeBtn)

    const list = document.getElementById('todos')
    list.appendChild(node)
}
function addGoalToDom(goal) {
    const node = document.createElement('li')
    const text = document.createTextNode(goal.name)

    const removeBtn = createRemoveButton(() => {
        appStates.dispatch(
            removeGoalActionCreator(goal.id)
        )
    })

    node.appendChild(text)
    node.appendChild(removeBtn)

    const list = document.getElementById('goals')
    list.appendChild(node)
}
