import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../index'


// export interface CounterState {
//   track: boolean
// }

const initialState = {
  saved_papers: [],
}

export const userLibrarySlice = createSlice({
  name: 'userLibrary',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    add_paper: (state,action) => {
        state.saved_papers.push(action.payload)
    },
    remove_paper: (state,action) => {
      // Remove paper from saved_papers
      state.saved_papers = state.saved_papers.filter(paper => paper.id !== action.payload.id)
  },
    set_papers: (state,action) =>{
        state.saved_papers = action.payload
    }

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
})

export const { add_paper,set_papers,remove_paper } = userLibrarySlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const userLibrary = (state: AppState) => state.userLibrary
export const selectSavedPapers = (state: AppState) => state.userLibrary.saved_papers

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default userLibrarySlice.reducer