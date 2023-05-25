import React,{useState, useEffect} from 'react';
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getallserv ,updateData} from '../utils/APIRoutes';
import axios from "axios";
import './main.css';
const Main = () => {
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
    
    // useEffect(()=> {
    //     async function getDateasas(){
    //         axios.post(updateData,{
    //             server:"bojowkarp",
    //             money:5,
    //         });
    //     }
    //     getDateasas()
    // },[])
    
    // <Link to="/panel" className="btn btn-primary">elo</Link>
    // <Link to="/s/lifeside" className="btn btn-primary">elo</Link>
    return (
        <div className='MainDivAllServers'>
            <div className="MaintopDiv"></div>
            <div className="MainMainDiv">
             <Link to="/panel" className="btn btn-primary">elo</Link>
            </div>
            <div className="MainbotDiv"></div>
        </div>
    );
}

export default Main;
