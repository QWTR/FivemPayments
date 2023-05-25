import React,{useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkStatusRoute } from "../../utils/APIRoutes"
import axios from "axios";
import $ from 'jquery';
import './status.css';

const Status = () => {
    const navigate = useNavigate();
    const [wait,setWait] = useState(false)
    
    const toastOptions={
        position: 'bottom-left',
        autoClose:3000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }
    const checkStatus = async function (){
        if(wait === false){
            let puhid = localStorage.getItem('puhId')
            let server = localStorage.getItem('server')

            const {data} = await axios.post(checkStatusRoute,{
                puhid,
                server
            });
            if(data.status == false){
                navigate('/error')
            }else{
                if(data.data == 'PositiveFinish'){
                    navigate('/thanks')
                }else if(data.data == 'NegativeAuthorization'){
                    navigate('/error')
                }
            }
            setWait(true)
        }
    } 

    let initialized = false
    useEffect(()=>{
        if (!initialized) {
            initialized = true
            checkStatus()
          }
       
        
    },[])
    let server
    let link = ''
    let item = {
        img: 'brak',
        price: 0,
        desc: 'brak',
        label: 'brak',
    }
    if(localStorage.getItem('server')){
        server = localStorage.getItem('server');
        link = `http://localhost:3000/s/${server}`
    }else{
        link = 'http://lcore.pl'
    }
    if(localStorage.getItem('item')){
        item = JSON.parse(localStorage.getItem('item'));
    }
    
    return (
            <div className="StatusContainer">
            <div className="topStatusDiv">
            <a href='http://lcore.pl'><img src="https://cdn.discordapp.com/attachments/702788153022480477/1085665680273186931/mlogo.png" alt="" /></a>
                <div className="asyilfgvgyilvftyugifyu">
                    <a href='https://discord.gg/8XDfVSGhM9'><i className="fa-brands fa-discord"></i></a>
                </div>
            </div>
            <div className="contentStatusDiv">
                <div className="contentStatusDivContent">
                    <h3>Oczekujemy na płatność</h3>
                    <p>czekamy na potwierdzenie Twojej płatności przez wybranego pośrednika płatności.<br></br>Jeżeli potrzebujesz pomocy z tą płatnością, skontaktuj się z nami.</p>
                    <div className="ebzisdsdadas">
                        <i className="fas fa-spinner fa-pulse"></i>
                    </div>
                    <a href={link}><div className="backPageBtnStatus">Powrót do sklepu</div></a>
                </div>
            </div>
            <div className="footerStatusDiv">
                <p>© 2022 lcore. Wszelkie prawa zastrzeżone.</p>
                <p>Ta strona nie jest powiązana ze Steam ani Valve.</p>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Status;
