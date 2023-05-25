import React,{useState, useEffect} from 'react';
import './panel.css'
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getallserv } from '../utils/APIRoutes';
import axios from "axios";
import Login from './login';
import Inpanels from './Inpanel';

const Panel = () => {
    const navigate = useNavigate();
    const [isLogin,setLogin] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [servers, setServers] = useState([]);
    const toastOptions={
        position: 'bottom-left',
        autoClose:5000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }
   
    useEffect(()=> {
        async function getDate(){
            if(!localStorage.getItem('app-user')){
                setLogin(undefined);
            }else{
                setLogin(true);        
                const {data} = await axios.post(getallserv);
                setServers(data.servers);
            }
        }
        getDate()
    },[])
    useEffect(()=>{
        if(isLogin !== undefined){
            toast.success('zalogowano', toastOptions);
        }
    },[isLogin])

    return (
        <div className="container-fluidsdsd" style={{overflow:'hidden'}}>
            {
               isLogin === undefined ?( 
                <Login/>
               ):(
                <Inpanels servers={servers}/>
               )
            }
            <ToastContainer/>
        </div>
    );
}

export default Panel;
