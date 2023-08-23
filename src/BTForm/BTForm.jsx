import React from 'react'
import FormInput from './Component/FormInput'
import FormTable from './Component/FormTable'

const BTForm = () => {
  return (
    <div className='container'>
      <h1 className='text-center mt-2'>Bài tập Form React</h1>
      <FormInput></FormInput>
      <FormTable></FormTable>
    </div>
  )
}

export default BTForm
