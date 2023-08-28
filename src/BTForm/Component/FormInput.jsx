import React, { useState } from 'react'
import qs from 'qs'
import { } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BTFormActions } from '../redux/slice'

const FormInput = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState()
  const [messErr, setMessErr] = useState()
  const { studentList, editStudent } = useSelector(state => state.BTForm)
  console.log(editStudent);

  const handleInputForm = () => (event) => {
    const { name, value, validity, title, minLength } = event.target
    let mess = ''
    const validate = () => {
      const { tooShort, valueMissing, patternMismatch } = validity
      if (valueMissing) {
        mess = `Vui lòng nhập ${title}`
      } else if (tooShort) {
        mess = `Vui lòng nhập ${title} ít nhất ${minLength} ký tự`
      } else if (patternMismatch) {
        mess = `Vui lòng nhập ${title} đúng định dạng`
      } else if (name === 'id') {
        for (let key in studentList) {
          if (studentList[key].id === value) {
            mess = `${title} bị trùng`
          }
        }
      }
      return mess
    }
    mess = validate()
    setMessErr({
      ...messErr,
      [name]: mess
    })

    setInputValue({
      ...inputValue,
      [name]: value
    })
  }


  return (
    <div className='container'>
      <h2 className="mt-2 py-2 px-2 text-white bg-dark">Thông tin sinh viên</h2>
      <form noValidate onSubmit={(event) => {
        event.preventDefault()
        const inputElement = document.querySelectorAll('input')

        let errors = {}
        inputElement.forEach(ele => {
          const { name, value, validity, title, minLength } = ele
          let mess = ''
          const { tooShort, valueMissing, patternMismatch } = validity
          if (valueMissing) {
            mess = `Vui lòng nhập ${title}`
          } else if (tooShort) {
            mess = `Vui lòng nhập ${title} ít nhất ${minLength} ký tự`
          } else if (patternMismatch) {
            mess = `Vui lòng nhập ${title} đúng định dạng`
          }
          errors[name] = mess
        })
        setMessErr(errors)
        let isFlag = false
        for (let key in messErr) {
          if (messErr[key]) {
            isFlag = true
            break
          }
        }
        if (isFlag) return
        dispatch(BTFormActions.addStudent(inputValue))
      }}>
        <div className="row">
          <div className="col-6 mt-3">
            <p>Mã SV</p>
            <input type="text"
              name='id'
              title='mã sinh viên'
              required
              value={editStudent?.id || ''}
              minLength={3}
              placeholder='Nhập mã sinh viên'
              className='form-control'
              onChange={handleInputForm()} />
            {messErr?.id && <p className='text-danger'>* {messErr.id}</p>}
          </div>
          <div className="col-6 mt-3">
            <p>Họ và tên</p>
            <input type="text"
              name='name'
              title='họ và tên'
              required
              value={editStudent?.name}
              minLength={2}
              pattern='^[\p{L} ]+$'
              placeholder='Nhập họ và tên'
              className='form-control'
              onChange={handleInputForm()} />
            {messErr?.name && <p className='text-danger'>* {messErr.name}</p>}
          </div>
          <div className="col-6 mt-3">
            <p>Số điện thoại</p>
            <input
              type="text"
              name='phone'
              title='số điện thoại'
              value={editStudent?.phone}
              minLength={10}
              required
              pattern='(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b'
              placeholder='Nhập số điện thoại'
              className='form-control'
              onChange={handleInputForm()} />
            {messErr?.phone && <p className='text-danger'>* {messErr.phone}</p>}
          </div>
          <div className="col-6 mt-3">
            <p>Email</p>
            <input
              type="text"
              name='email'
              title='email'
              value={editStudent?.email}
              required
              minLength={5}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              placeholder='Nhập email'
              className='form-control'
              onChange={handleInputForm()} />
            {messErr?.email && <p className='text-danger'>* {messErr.email}</p>}

          </div>
        </div>
        <div className="d-flex gap-5 justify-content-between">
          <button className="btn btn-success mt-2" type='submit'>Thêm sinh viên</button>
          <button className="btn btn-success mt-2" type='submit'>Lưu</button>
        </div>
      </form>
    </div>
  )
}

export default FormInput
