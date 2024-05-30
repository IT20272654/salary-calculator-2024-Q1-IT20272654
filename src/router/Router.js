import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import Salary from '../page/Salary'

const Router = () => {
    return (
      <Routes>
          <Route path='/' element={<Navigate to = '/salary' />} />
          <Route path='/salary' element={<Salary/>} />
      </Routes>
    )
  }
  
  export default Router