import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    studentList: [],
    editStd: undefined,
    // editedStd: undefined
}
const BTFormSlice = createSlice({
    name: 'BTForm',
    initialState,
    reducers: {
        addStudent: (state, action) => {
            state.studentList.push(action.payload)
        },
        deleteStudent: (state, action) => {
            state.studentList = state.studentList.filter(student => student.id !== action.payload)
        },
        editStudent: (state, action) => {
            state.editStd = action.payload
        },
        saveStudent: (state, action) => {
            state.studentList = state.studentList.map(student => {
                if (student.id === action.payload.id) {
                    return action.payload
                }
            })
        }


    },

}
)
export const { reducer: BTFormReducer, actions: BTFormActions } = BTFormSlice