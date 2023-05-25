import React,{useState, useEffect} from 'react';
import './panel.css'
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserServer } from "../utils/APIRoutes"
import axios from "axios";
import Inpanel from './INpanel';
import { data } from 'jquery';

const Panelu = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    let [server, setServer] = useState([]);
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
                navigate("/panel")
            }else{
                setCurrentUser(JSON.parse(localStorage.getItem("app-user")))
             
            }
        }
        getDate()
       
    },[])
    useEffect(()=> {
        async function getDateq(){
            
            if(currentUser === undefined){
                
            }else{
                if(currentUser._id < 5){
                    window.location.href ='http://lcore.pl'
                }else{
                    if(currentUser.type !== 'user'){
                        window.location.href ='http://lcore.pl'
                    }else{
                        let owner = currentUser._id
                        
                        const {data} = await axios.post(`${getUserServer}/${currentUser._id}`,{
                            owner
                        })
                        console.log(data)
                        setServer(data.server);
                    }
                }
                
            
             
            }
        }
        getDateq()
       
    },[currentUser])
  
    return (
       <div className="container-fluiddsasdasd">
            { 
                server.length !== 0?<Inpanel currentUser={currentUser} server={server}/>:""
                
            }
            <ToastContainer/>
       </div>
    );
}

export default Panelu;
