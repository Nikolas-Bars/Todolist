import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const fetchTodolistsTC = createAsyncThunk('todolist/fetchTodolist', async (param, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    const res = await todolistsAPI.getTodolists()
        try {
            thunkAPI.dispatch(setAppStatusAC({status:'succeeded'}))
            return res.data
        }
        catch(error) {
            // @ts-ignore
            handleServerNetworkError(error, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue('Error')
        }
})

export const removeTodolistTC = createAsyncThunk('todolist/removeTodolist', async (param: {todolistId: string}, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: param.todolistId, status: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(param.todolistId)
            //скажем глобально приложению, что асинхронная операция завершена
            thunkAPI.dispatch(setAppStatusAC({status:'succeeded'}))
            return param.todolistId
})

export const addTodolistTC = createAsyncThunk('todolist/addTodolist', async (param:{title: string}, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
        const res = await todolistsAPI.createTodolist(param.title)
            thunkAPI.dispatch(setAppStatusAC({status:'succeeded'}))
            return {todolist: res.data.data.item}
})

// export const changeTodolistTitleTC_ = (id: string, title: string) => {
//     return (dispatch: Dispatch<ActionsType>) => {
//         todolistsAPI.updateTodolist(id, title)
//             .then((res) => {
//                 dispatch(changeTodolistTitleAC({id: id, title: title}))
//             })
//     }
// }

export const changeTodolistTitleTC = createAsyncThunk('todolist/changeTitle', async (param:{id: string, title: string}, thunkAPI)=>{
    const res = todolistsAPI.updateTodolist(param.id, param.title)
        return {id: param.id, title: param.title}
})










const slice = createSlice({
    name: 'todolist',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>){
            state[state.findIndex(tl => tl.id === action.payload.id)].filter = action.payload.filter

        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{id: string, status: RequestStatusType}>){
            state[state.findIndex(tl => tl.id === action.payload.id)].entityStatus = action.payload.status
        },
    },
    extraReducers: (builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action)=>{
            return action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action)=>{
            let index = state.findIndex(tl => tl.id === action.payload)
            if(index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action)=>{
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action)=>{
            let index = state.findIndex(tl => tl.id == action.payload.id)
            state[index].title = action.payload.title
        })
    })

})


export const todolistsReducer = slice.reducer
export const {changeTodolistFilterAC, changeTodolistEntityStatusAC} = slice.actions

// actions
// thunks





// types


type ActionsType =
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>




// export const removeTodolistTC_ = (todolistId: string) => {
//     return (dispatch: ThunkDispatch) => {
//         //изменим глобальный статус приложения, чтобы вверху полоса побежала
//         dispatch(setAppStatusAC({status:'loading'}))
//         //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
//         dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
//         todolistsAPI.deleteTodolist(todolistId)
//             .then((res) => {
//                 dispatch(removeTodolistAC({id: todolistId}))
//                 //скажем глобально приложению, что асинхронная операция завершена
//                 dispatch(setAppStatusAC({status:'succeeded'}))
//             })
//     }
// }
//
// export const addTodolistTC_ = (title: string) => {
// //     return (dispatch: ThunkDispatch) => {
// //         dispatch(setAppStatusAC({status:'loading'}))
// //         todolistsAPI.createTodolist(title)
// //             .then((res) => {
// //                 dispatch(addTodolistAC({todolist: res.data.data.item}))
// //                 dispatch(setAppStatusAC({status:'succeeded'}))
// //             })
// //     }
// // }