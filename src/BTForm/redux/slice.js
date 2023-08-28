import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    studentList: [],
    editStudent: {}
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
            state.editStudent = action.payload
        }

    },

}
)
export const { reducer: BTFormReducer, actions: BTFormActions } = BTFormSlice