import React,{useState, useEffect} from 'react';
import { json, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getserverinfoID } from "../../utils/APIRoutes"
import axios from "axios";
import { Link } from "react-router-dom";
import $ from 'jquery';

const ServerInfo = () => {
    const [server, setServer] = useState([]);
    useEffect(()=>{
        async function wowo(){ 
            let ptag = []
            let stat = []
            var servera = window.location.pathname.slice(-24)
            const data = await axios.post(getserverinfoID,{
                servera
            })    
            for(let i in data.data.server.puhHist){
                if(data.data.server.puhHist[i].ineq === false){
                    ptag.push({
                        hex: data.data.server.puhHist[i].steamhex,
                        item: data.data.server.puhHist[i].item,
                        addons:data.data.server.puhHist[i].addons
                    });
                    stat.push(data.data.server.puhHist[i]);
                }
            }
            setServer(stat)
            document.querySelector('.aghsdgbsyuiSDOIFTWERIPEYWRTIO').innerHTML = JSON.stringify(ptag)
        }
        wowo()
        async function wowu(){ 
           
        }
        wowu()
    },[])
    
    return (
       <div style={{backgroundColor:"#000",color:"#fff",width:"100vw",height:"100vh"}} className="aghsdgbsyuiSDOIFTWERIPEYWRTIO"></div>
    );
}
export default ServerInfo;
