import React,{useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Fancy from './pages/s/fancyrp/fancyrp';
import Main from './pages/main/main';
import Status from './pages/s/status/status';
import ErrorPage from './pages/s/status/error';
import ThanksPage from './pages/s/status/thanks';
import ServerInfo from './pages/s/serversInfo/serverinfo';
import { getUseraAllserver } from './pages/utils/APIRoutes';
import axios from "axios";

export default  function App(){
  const [dataSU,setDataSU] = useState([])
  useEffect(()=>{
    async function kurwa(){
      let cos = "cos"
      let {data} = await axios.post(getUseraAllserver,{
       cos 
      })
      setDataSU(data.servers)
    }
    kurwa()
  },[])

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='*' element={<Main/>}/>
        <Route path='/status' element={<Status/>}/>
        <Route path='/error' element={<ErrorPage/>}/>
        <Route path='/thanks' element={<ThanksPage/>}/>
        {
          dataSU !== undefined ?(
            dataSU.map((path,index)=>{
              return(
                <Route key={index} path={`/s/${path.server}`} element={<Fancy/>}/>
                
              );
            })

          ):''
        }
        {
          dataSU !== undefined ?(
            dataSU.map((path,index)=>{
              return(
                <Route key={index} path={`/s/${path.server}/${path._id}`} element={<ServerInfo/>}/>
              );
            })

          ):''
        }
     
      </Routes>
    </BrowserRouter>
  )
}