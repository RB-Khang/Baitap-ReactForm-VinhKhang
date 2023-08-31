import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BTFormActions } from '../redux/slice'

const FormTable = ({ inputValue, setInputValue, searchList, setSearchList }) => {
  const dispatch = useDispatch()
  const myForm = document.querySelector('form')
  const { studentList } = useSelector(state => state.BTForm)
  // console.log(searchList);
  useEffect(() => {
    const { value } = document.getElementById('searchInput')
    const nameSearch = value.replace(/\s/g, '').toUpperCase()
    let search = studentList.filter(student =>
      student.name.replace(/\s/g, '').toUpperCase().indexOf(nameSearch) !== -1
    )
    setSearchList(search)
  }, [studentList, searchList])

  return (
    <div className='container mt-3 '>
      <div>
        <h4 className='bg-dark text-white text-center p-2'>Tìm kiếm sinh viên</h4>
        <input className='form-control mb-2' id='searchInput' type="text" placeholder='Nhập tên sinh viên' onChange={(event) => {
          const { value } = event.target
          const nameSearch = value.replace(/\s/g, '').toUpperCase()
          let search = studentList.filter(student =>
            student.name.replace(/\s/g, '').toUpperCase().indexOf(nameSearch) !== -1
          )
          setSearchList(search)
        }} />
      </div>
      <table className="table">
        <thead>
          <tr className='table-dark'>
            <th>Mã SV</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            (searchList.length ? searchList : studentList).map(student => {
              return <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>
                  <div className='d-flex gap-2'>
                    <button className='btn btn-outline-success' onClick={() => {
                      dispatch(BTFormActions.editStudent(student))
                      let maSV = document.getElementById('maSV')
                      maSV.disabled = true
                    }}>Edit</button>
                    <button className='btn btn-outline-danger' onClick={() => {
                      if (window.confirm('Bạn có chắc chắn muốn xoá thông tin sinh viên này không?')) {
                        dispatch(BTFormActions.deleteStudent(student.id))
                        setInputValue({})
                      }
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
