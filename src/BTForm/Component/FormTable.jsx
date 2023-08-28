import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BTFormActions } from '../redux/slice'

const FormTable = () => {
  const { studentList } = useSelector(state => state.BTForm)
  const dispatch = useDispatch()
  const myForm = document.querySelector('form')

  return (
    <div className='container mt-3 '>
      <table className="table">
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            studentList.map(student => {
              return <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>
                  <div className='d-flex gap-2'>
                    <button className='btn btn-success' onClick={() => {
                      dispatch(BTFormActions.editStudent(student))
                    }}>Edit</button>
                    <button className='btn btn-danger' onClick={() => {
                      dispatch(BTFormActions.deleteStudent(student.id))
                      myForm.reset()
                    }}>Delete</button>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>

    </div>
  )
}

export default FormTable
