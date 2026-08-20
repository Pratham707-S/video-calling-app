import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Video_Room from './Video_Room'
import ZeoCloud from './ZeoCloud'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<ZeoCloud/>} />
      
         <Route path='/room/:id' element={<Video_Room/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App