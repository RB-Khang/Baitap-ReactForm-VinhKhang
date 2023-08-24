import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BTFormAction } from '../redux/slice'

const FormInput = () => {
  const [formValue, setInputValue] = useState()
  const [errorMess, setErrorMess] = useState()
  // console.log(errorMess);

  const dispatch = useDispatch()
  const { studentList } = useSelector(state => state.BTForm)



  const validate = (element) => {
    const { name, value, validity, minLength, title } = element
    const { valueMissing, tooShort, patternMismatch } = validity
    let mess = ''
    if (valueMissing) {
      mess = 'Vui lòng nhập nội dung'
    } else if (tooShort) {
      mess = `Vui lòng nhập tối thiểu ${minLength} ký tự`
    } else if (patternMismatch) {
      mess = `Vui lòng nhập đúng định dạng ${title}`
    }
    return mess
  }
  const handleFormValue = () => (event) => {
    const { name, value } = event.target
    let mess = validate(event.target)

    setErrorMess({
      ...errorMess,
      [name]: mess
    })

    setInputValue(
      {
        ...formValue,
        [name]: value
      }
    )

  }
  // console.log(formValue);
  return (
    <div className='container'>
      <form noValidate onSubmit={(event) => {
        event.preventDefault()
      }}>
        <h3 className='text-white bg-dark px-2 py-2 mt-3'>Thông tin sinh viên</h3>
        <div className="row">
          <div className="col-6">
            <p className='mt-5 ps-2'>Mã SV</p>
            <input type="text"
              name='id'
              title='mã sinh viên'
              required
              minLength={5}
              className='form-control'
              placeholder='Nhập mã sinh viên'
              value={formValue?.id || ''}
              onChange={handleFormValue()} />
            {errorMess?.id && <p className='text-danger'>{errorMess.id}</p>}
          </div>
          <div className="col-6">
            <p className='mt-5 ps-2'>Họ tên</p>
            <input type="text"
              name='name'
              required
              className='form-control'
              placeholder='Nhập họ và tên'
              value={formValue?.name || ''}
              onChange={handleFormValue()} />
            {errorMess?.name && <p className='text-danger'>{errorMess.name}</p>}
          </div>
          <div className="col-6">
            <p className='mt-5 ps-2'>Số điện thoại</p>
            <input type="text"
              name='phone'
              required
              className='form-control'
              placeholder='Nhập số điện thoại'
              value={formValue?.phone || ''}
              onChange={handleFormValue()} />
          </div>
          <div className="col-6">
            <p className='mt-5 ps-2'>Email</p>
            <input type="text"
              name='email'
              required
              className='form-control'
              placeholder='Nhập email'
              value={formValue?.email || ''}
              onChange={handleFormValue()} />
          </div>
        </div>
        <button className='btn btn-success mt-2' onClick={() => {
          dispatch(BTFormAction.addStudent(formValue))
        }}>Thêm sinh viên</button>
      </form>
    </div>
  )
}

export default FormInput
