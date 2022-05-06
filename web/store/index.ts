import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import settingsReducer from '../store/slices/settingsSlice'
import userLibraryReducer from '../store/slices/userLibrarySlice'

export function makeStore() {

  return configureStore({
    reducer: { settings:settingsReducer,userLibrary:userLibraryReducer }
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store