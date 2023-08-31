import React, { useState } from 'react'
import FormInput from './Component/FormInput'
import FormTable from './Component/FormTable'

const BTForm = () => {
  const [inputValue, setInputValue] = useState()
  const [searchList, setSearchList] = useState()
  const [messErr, setMessErr] = useState();


  return (
    <div className='container'>
      <h1 className='text-center mt-2'>Bài tập Form React</h1>
      <FormInput inputValue={inputValue} setInputValue={setInputValue} messErr={messErr} setMessErr={setMessErr}></FormInput>
      <FormTable inputValue={inputValue} setInputValue={setInputValue} searchList={searchList} setSearchList={setSearchList} messErr={messErr} setMessErr={setMessErr}></FormTable>
    </div>
  )
}

export default BTForm
