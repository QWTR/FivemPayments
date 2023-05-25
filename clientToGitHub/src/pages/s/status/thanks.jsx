import React,{useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import $ from 'jquery';
import './status.css';

const ThanksPage = () => {
    const navigate = useNavigate();
    const toastOptions={
        position: 'bottom-left',
        autoClose:3000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }
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
                    <h3>Dziękujemy za zakup</h3>
                    <p>Zakupiony przez ciebie przedmiot wkrótce zostanie dostarczony automatycznie!<br></br> Jeśli nie napisz do administracij serwer!</p>
                    <div className="itemInfStat">
                        <div className="itemStatImg">
                            <img src={item.img} alt="" />
                        </div>
                        <div className="itemStatInfo">
                            <div className="itemLabel">{item.label}</div>
                            <div className="itemdesc">{item.desc}</div>
                            <div className="itemprice">{item.price}zł</div>
                        </div>
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

export default ThanksPage;
