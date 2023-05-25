import React,{useState, useEffect} from 'react';
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUseraAllserver } from '../utils/APIRoutes';
import axios from "axios";
import './main.css';
const Main = () => {
    const navigate = useNavigate();
    const [dataSU,setDataSU] = useState([])
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
    return (
        <div className='MainDivAllServers'>
            <div className="MaintopDiv"></div>
            <div className="MainMainDiv">
                <div className="ServersDiv">
                    <div className="ggH1">
                        <h3>Wybierz Serwer</h3>
                        <span>Serwery które z nami współpracują!</span>
                    </div>
                    <div className="stCststas">
                    {
                    dataSU !== undefined ?(
                        dataSU.map((path,index)=>{
                        return(
                            <Link key={index} to={`/s/${path.server}`}>
                                <div className="serverDiv">
                                    <div className="serverImage">
                                        <img src={path.logo}></img>
                                    </div>
                                
                                </div>
                            </Link>
                        );
                        })

                    ):''
                    }
                    </div>
                </div>
            </div>
            <div className="MainbotDiv"></div>
        </div>
    );
}

export default Main;
