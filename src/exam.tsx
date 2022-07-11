// import ReactDOM from 'react-dom'
// import {applyMiddleware, combineReducers, createStore} from 'redux'
// import thunk from 'redux-thunk'
// import {Provider, useDispatch, useSelector} from 'react-redux'
//
// const initState = {
//     work: 0,
//     donate: 0,
//     balance: 0,
// }
//
// const appReducer = (state = initState, action: any) => {
//     switch (action.type) {
//         case 'CHANGE_VALUE':
//             return {
//                 ...state,
//                 ...action.payload,
//             }
//     }
//     return state
// }
//
// const reducers = combineReducers({
//     app: appReducer,
//     // ...
// })
//
// const store = createStore(reducers, applyMiddleware(thunk))
//
// const changeValue = (payload: any) => ({type: 'CHANGE_VALUE', payload} as const)
// // ...
//
// export const Income = () => {
//     const {work, donate, balance} = useSelector((state: any) => state.app)
//     const dispatch = useDispatch()
//
//     return (
//         <div>
//             <div>
//                 work: <input value={work} onChange={e => dispatch(changeValue({work: +e.target.value}))}/>
//             </div>
//             <div>
//                 donate: <input value={donate} onChange={e => dispatch(changeValue({donate: +e.target.value}))}/>
//             </div>
//
//             <div>balance: {balance}</div>
//             <button
//                 onClick={() => {
//                     // тут
//                 }}
//             >
//                 calculate balance
//             </button>
//         </div>
//     )
// }
//
// ReactDOM.render(<Provider store={store}><Income/></Provider>,
//     document.getElementById('root')
// )

// напишите необходимы код для 49 строки
// чтобы вывелась сумма дохода в строке баланса

// пример ответа: return work + donate

// правильный ответ: // dispatch(changeValue({balance: balance + donate + work})) - неверно


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////



//
// import ReactDOM from 'react-dom'
// import {applyMiddleware, combineReducers, createStore} from 'redux'
// import thunk from 'redux-thunk'
// import {Provider, useDispatch, useSelector} from 'react-redux'
// import {useState} from 'react'
//
// const initState = {tasks: []}
//
// const appReducer = (state = initState, action: any) => {
//     switch (action.type) {
//         case 'ADD_TASK':
//             return {
//                 ...state,
//                 tasks: [action.task, ...state.tasks]
//             }
//         case 'CHANGE_TASK':
//             return {
//                 ...state,
//                 tasks: [action.task, ...state.tasks.map((t: any) => t.id == action.task.id ? {...t, name: action.task.name} : t)]
//             }
//     }
//     return state
// }
//
// const reducers = combineReducers({
//     app: appReducer,
//     // ...
// })
//
// const store = createStore(reducers, applyMiddleware(thunk))
//
// const addTask = (task: any) => ({type: 'ADD_TASK', task} as const)
// const changeTask = (task: any) => ({type: 'CHANGE_TASK', task} as const)
// // ...
//
// const Modal = (props: any) => {
//     const [value, setValue] = useState(props.task?.name || '')
//
//     return (
//         <div>
//             modal:
//             <input
//                 value={value}
//                 onChange={e => setValue(e.target.value)}
//
//             />
//             <button onClick={() => props.callback(value)}>{props.title}</button>
//         </div>
//     )
// }
//
// const Task = (props: any) => {
//     const [show, setShow] = useState(false)
//
//     return (
//         <div>
//             {props.task.name}
//             <button onClick={() => setShow(true)}>change</button>
//             {show && (
//                 <Modal
//                     callback={(value: string) => {
//                         props.change(value)
//                         setShow(false)
//
//                     }}
//                     title={'change'}
//                     task={props.task}
//                 />
//             )}
//         </div>
//     )
// }
//
// export const Todolist = () => {
//     const {tasks} = useSelector((state: any) => state.app)
//     const dispatch = useDispatch()
//     const [show, setShow] = useState(false)
//
//     const getId = () => tasks.reduce((acc: number, t: any) => acc > t.id ? acc : t.id, 0) + 1
//
//     const mapped = tasks.map((t: any) => (
//         <Task
//             key={t.id}
//             task={t}
//             change={(value: string) => dispatch(changeTask({id: t.id, name: value}))}
//         />
//     ))
//
//     return (
//         <div>
//             <button onClick={() => setShow(true)}>add</button>
//             {show && (
//                 <Modal
//                     callback={(value: string) => {
//                         dispatch(addTask({id: getId(), name: value}))
//                         setShow(false)
//                     }}
//                     title={'add'}
//
//                 />
//             )}
//
//             {mapped}
//         </div>
//     )
// }
//
// ReactDOM.render(<Provider store={store}><Todolist/></Provider>,
//     document.getElementById('root')
// )

// при изменении существующей таски в инпуте не отображается старые данные
// укажите номер строки и необходимый код для неё чтобы исправить это

// пример ответа: 45 defaultValue={value}

// правильный ответ: task={props.task} ВЕРНО про номер строки не забудь //

//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////

// import ReactDOM from 'react-dom'
// import {applyMiddleware, combineReducers, createStore} from 'redux'
// import thunk from 'redux-thunk'
// import {Provider, useDispatch, useSelector} from 'react-redux'
// import {useState} from 'react'
//
// const initState = {goodThings: []}
//
// const appReducer = (state = initState, action: any) => {
//     switch (action.type) {
//         case 'LIKE':
//             return {
//                 ...state,
//                 goodThings: [action.thing, ...state.goodThings]
//             }
//     }
//     return state
// }
//
// const reducers = combineReducers({
//     app: appReducer,
//     // ...
// })
//
// const store = createStore(reducers, applyMiddleware(thunk))
//
// const addThing = (thing: any) => ({type: 'LIKE', thing} as const)
// // ...
//
// const Modal = (props: any) => {
//     return (
//         <div>
//             modal:
//             <input
//                 value={props.value}
//                 onChange={e => props.setValue(e.target.value)}
//             />
//             <button onClick={props.add}>add</button>
//         </div>
//     )
// }
//
// export const Animals = () => {
//     const {goodThings} = useSelector((state: any) => state.app)
//     const dispatch = useDispatch()
//     const [value, setValue] = useState('')
//     const [show, setShow] = useState(false)
//
//     const mapped = goodThings.map((t: any, i: number) => <div key={i}>{t}</div>)
//
//     return (
//         <div>
//             <button onClick={() => setShow(true)}>show modal</button>
//
//             {show && (
//                 <Modal
//                     value={value}
//                     setValue={setValue}
//                     add={() => {
//                         dispatch(addThing(value))
//                         setValue('')
//
//                     }}
//                 />
//             )}
//
//             {mapped}
//         </div>
//     )
// }
//
// ReactDOM.render(<Provider store={store}><Animals/></Provider>,
//     document.getElementById('root')
// )

// необходимо сделать так
// чтобы модалка пряталась сразу после добавления элемента
// укажите номер строки и необходимый код для неё чтобы работало

// пример ответа: 50 closeModal(true) // пока не знаю

// правильный ответ:

//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//
// import ReactDOM from 'react-dom'
// import {applyMiddleware, combineReducers, createStore} from 'redux'
// import thunk from 'redux-thunk'
// import {Provider, useDispatch, useSelector} from 'react-redux'
//
// const initState = {
//     animals: [
//         {likes: 0, name: 'cat'},
//         {likes: 0, name: 'dog'},
//         {likes: 0, name: 'fish'},
//         {likes: 0, name: 'spider'},
//         {likes: 0, name: 'bird'},
//     ]
// }
//
// const appReducer = (state = initState, action: any) => {
//     switch (action.type) {
//         case 'LIKE':
//             return {
//                 ...state,
//                 animals: state.animals.map(animal => {
//                     return true ? {...animal} : animal
//                 })
//             }
//     }
//     return state
// }
//
// const reducers = combineReducers({
//     app: appReducer,
//     // ...
// })
//
// const store = createStore(reducers, applyMiddleware(thunk))
//
// const like = (likes: any, name: any) => ({type: 'LIKE', likes, name} as const)
// // ...
//
// export const Animals = () => {
//     const {animals} = useSelector((state: any) => state.app)
//     const dispatch = useDispatch()
//
//     const mapped = animals
//         .map((a: any, i: number) => (
//             <div key={i}>
//                 {a.name}
//                 -{a.likes}-
//                 <button
//                     onClick={() => dispatch(like(a.likes + 1, a.name))}
//                 >
//                     Like!
//                 </button>
//             </div>
//         ))
//
//
//     return (
//         <div>
//             {mapped}
//         </div>
//     )
// }
//
// ReactDOM.render(<Provider store={store}><Animals/></Provider>,
//     document.getElementById('root')
// )

// лайки не увеличиваются
// укажите номер строки и необходимый код для неё чтобы работало

// пример ответа: 47  -{a.likes + 1}-

// правильный ответ:  true ? {...animal, likes: action.likes, name: action.name} : animal - неверно

//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////

//
// import ReactDOM from 'react-dom'
// import {applyMiddleware, combineReducers, createStore} from 'redux'
// import thunk from 'redux-thunk'
// import {Provider, useDispatch, useSelector} from 'react-redux'
//
// const initState = {
//     goodMorning: [
//         {id: 1, name: 'errors'},
//         {id: 2, name: 'bugs'},
//         {id: 3, name: 'fackups'},
//         {id: 4, name: 'laziness'},
//         {id: 5, name: 'work'},
//     ]
// }
//
// const appReducer = (state = initState, action: any) => {
//     switch (action.type) {
//         case 'DELETE':
//             return {
//                 ...state,
//                 goodMorning: state.goodMorning
//                     .filter(g => g.id !== action.id)
//             }
//     }
//     return state
// }
//
// const reducers = combineReducers({
//     app: appReducer,
//     // ...
// })
//
// const store = createStore(reducers, applyMiddleware(thunk))
//
// const deleteSome = (id: any) => ({type: 'DELETE', id} as const)
// // ...
//
// export const Monday = () => {
//     const {goodMorning} = useSelector((state: any) => state.app)
//     const dispatch = useDispatch()
//
//     const mapped = goodMorning
//         .map((p: any, i: number) => (
//             <div key={i}>
//                 {p.name}
//                 <button
//                     onClick={() => dispatch(deleteSome(p.id))}
//                 >
//                     X
//                 </button>
//             </div>
//         ))
//
//
//     return (
//         <div>
//             {mapped}
//         </div>
//     )
// }
//
// ReactDOM.render(<Provider store={store}><Monday/></Provider>,
//     document.getElementById('root')
// )

// ничего не удаляется
// укажите номер строки и необходимый код для неё чтобы работало

// пример ответа: 41 delete goodMorning

// правильный ответ: onClick={() => dispatch(deleteSome(p.id))} - верно // про номер строки не забудь


///////////////////////////
///////////////////////////
///////////////////////////
///////////////////////////


//
// import ReactDOM from 'react-dom'
// import {applyMiddleware, combineReducers, createStore, Dispatch} from 'redux'
// import thunk from 'redux-thunk'
// import {Provider, useDispatch, useSelector} from 'react-redux'
// import {useEffect, useState} from 'react'
// import axios from 'axios'
//
// const initState = {friends: []}
//
// const appReducer = (state = initState, action: any) => {
//     switch (action.type) {
//         case 'SET_FRIENDS':
//             return {...state, friends: action.friends}
//     }
//     return state
// }
//
// const reducers = combineReducers({
//     app: appReducer,
//     // ...
// })
//
// const store = createStore(reducers, applyMiddleware(thunk))
//
// const setFriends = (friends: any[]) => ({type: 'SET_FRIENDS', friends} as const)
// // ...
//
// const getFriends = (name: string) => (dispatch: Dispatch) => {
//     axios
//         .get('http://world.com/friends?name=' + name)
//         .then(res => dispatch(setFriends(res.data.friends)))
// }
//
// export const Friends = () => {
//     const {friends} = useSelector((state: any) => state.app)
//     const dispatch = useDispatch()
//     const [name, setName] = useState('')
//     const [timerId, setTimerId] = useState(0)
//
//     useEffect(() => {
//
//         setTimerId(+setTimeout(() => {
//             dispatch(getFriends(name))
//         }, 1500))
//
//     }, [name])
//
//     const mapped = friends
//         .map((p: any, i: number) => <div key={i}>{p.name}</div>)
//
//     return (
//         <div>
//             <input
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//             />
//             {mapped}
//         </div>
//     )
// }
//
// ReactDOM.render(<Provider store={store}><Friends/></Provider>,
//     document.getElementById('root')
// )

// не работает дебаусинг: запрос идёт при вводе каждой буквы,
// а нужно - если пользователь ничего не вводит в течении 1500 милисекунд
// укажите номер строки и необходимый код для неё чтобы работало

// пример ответа: 54 value={name(1500)}

// правильный ответ: 46 }, [name, timerId]) - неверно



//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////



// import ReactDOM from 'react-dom'
// import {applyMiddleware, combineReducers, createStore, Dispatch} from 'redux'
// import thunk from 'redux-thunk'
// import {Provider, useDispatch, useSelector} from 'react-redux'
// import {useEffect} from 'react'
// import axios from 'axios'
//
// const initState = {page: 1, planets: []}
//
// const appReducer = (state = initState, action: any) => {
//     switch (action.type) {
//         case 'SET_PAGE':
//             return {...state, page: action.page}
//         case 'SET_PLANETS':
//             return {...state, planets: action.planets}
//     }
//     return state
// }
//
// const reducers = combineReducers({
//     app: appReducer,
//     // ...
// })
//
// const store = createStore(reducers, applyMiddleware(thunk))
//
// const setPage = (page: number) => ({type: 'SET_PAGE', page} as const)
// const setPlanets = (planets: any[]) => ({type: 'SET_PLANETS', planets} as const)
// // ...
//
// const getPlanets = () => (dispatch: Dispatch, getState: any) => {
//     const page = getState().app.page
//     axios
//         .post('http://cosmos.com/planets?page=' + page)
//         .then(res => dispatch(setPlanets(res.data.planets)))
// }
//
// export const Cosmos = () => {
//     const {page, planets} = useSelector((state: any) => state.app)
//     const dispatch = useDispatch()
//
//     useEffect(() => {
//         dispatch(getPlanets())
//     }, [page])
//
//     const mapped = planets
//         .map((p: any, i: number) => <div key={i}>{p.title}</div> )
//     const pages = new Array(10)
//         .fill(1)
//         .map((p, i) => (<button
//                 key={i}
//                 onClick={() => dispatch(setPage(i + 1))}
//                 disabled={page === i + 1}
//             >
//                 {i + 1}
//             </button>
//         ))
//
//     return (
//         <div>
//             {mapped}
//             {pages}
//         </div>
//     )
// }
//
// ReactDOM.render(<Provider store={store}><Cosmos/></Provider>,
//     document.getElementById('root')
// )
//
// // не запрашиваются следующие страницы
// // укажите номер строки и необходимый код для неё чтобы работало //
// // пример ответа: 63 {pages.next()}
//
// // правильный ответ: const page = getState().app.page - верно