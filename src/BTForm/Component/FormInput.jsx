import React, { useState } from 'react'
import qs from 'qs'
import { } from 'react-router-dom'

const FormInput = () => {
  const [inputValue, setInputValue] = useState()
  const [messErr, setMessErr] = useState()
  // console.log(messErr);
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
      }}>
        <div className="row">
          <div className="col-6 mt-3">
            <p>Mã SV</p>
            <input type="text"
              value={inputValue?.id || ''}
              name='id'
              title='mã sinh viên'
              required
              minLength={5}
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
              minLength={10}
              pattern='(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b'
              title='số điện thoại'
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
              minLength={5}
              pattern="^[a-zA-Z][a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$"
              placeholder='Nhập email'
              className='form-control'
              onChange={handleInputForm()} />
            {messErr?.email && <p className='text-danger'>* {messErr.email}</p>}

          </div>
        </div>
        <button className="btn btn-success mt-2">Thêm sinh viên</button>
      </form>
    </div>
  )
}

export default FormInput
