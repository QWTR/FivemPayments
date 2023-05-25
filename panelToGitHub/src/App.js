import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Panelu from './pages/panelu/panelu';
import Panel from './pages/panel/panel';
import Main from './pages/main/main';
export default  function App(){

  
  return(
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Main/>}/>
        <Route path='/panel' element={<Panel/>}/>
        <Route path='/panelu' element={<Panelu/>}/>
      </Routes>
    </BrowserRouter>
  )
}