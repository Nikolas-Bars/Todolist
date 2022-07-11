import {Dispatch} from 'redux'
import {authAPI} from '../api/todolists-api'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {action} from "@storybook/addon-actions";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const initializeAppTC = createAsyncThunk('app/initialized', async (param, thunkAPI)=>{
    const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: true}));
            return
        } else {

        }
        return
    })

export const slice = createSlice({
    name: "app",
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false,
    }as InitialStateType,
    reducers:{
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>){
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>){
            state.status = action.payload.status
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(initializeAppTC.fulfilled, (state, action)=>{
            state.isInitialized = true
        })
    }
})




export const appReducer = slice.reducer

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}

export const {setAppErrorAC, setAppStatusAC} = slice.actions



export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

// export const initializeAppTC_ = () => (dispatch: Dispatch) => {
//     authAPI.me().then(res => {
//         if (res.data.resultCode === 0) {
//             dispatch(setIsLoggedInAC({value: true}));
//         } else {
//
//         }
//
//     })
// }
//
//
//
// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
// //     switch (action.type) {
// //         case 'APP/SET-STATUS':
// //             return {...state, status: action.status}
// //         case 'APP/SET-ERROR':
// //             return {...state, error: action.error}
// //         case 'APP/SET-IS-INITIALIED':
// //             return {...state, isInitialized: action.value}
// //         default:
// //             return {...state}
// //     }
// // }