import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {authAPI, FieldErrorType, LoginParamsType} from '../../api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {action} from "@storybook/addon-actions";
import Axios, {AxiosError} from "axios";

export const loginTC_ = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
//типизация createAsyncThunk - 1 параметр - то чем зарезолвится в случае успеха, 2 параметр - значения которые
// приходят в санку, третьим параметром описываем возможную ошибку
export const loginTC = createAsyncThunk<{isLoggedIn: boolean}, LoginParamsType, {rejectValue: {errors: Array<string>, fieldsErrors?:  Array<FieldErrorType> }}>('auth/loginTC', async (param, thunkAPI) => {
    const res = await authAPI.login(param)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {isLoggedIn: true} // просто переименовал value чтобы не запутаться
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors}) //в случае неудачного запроса мы можем зареджектить thunkApi
            // нужным нам значением

        }
    } catch (err) {
        // @ts-ignore
        handleServerNetworkError(error, thunkAPI.dispatch)
        // @ts-ignore
        return thunkAPI.rejectWithValue({errors: err.message, fieldsError: undefined})
    }

})

const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        setIsLoggedInAC(state: InitialStateType, action: PayloadAction<{ value: boolean }>) {// каждый case теперь будет мини редьюсером,
            state.isLoggedIn = action.payload.value // мы оставляем этот AC так как будем вызывать его и в других местах.
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) =>{
            debugger
                state.isLoggedIn = action.payload.isLoggedIn
        })
    }
})

export const authReducer = slice.reducer

export const setIsLoggedInAC = slice.actions.setIsLoggedInAC

// thunks

export const logoutTC = () => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {

            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types

type ActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {
    isLoggedIn: boolean
}

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
