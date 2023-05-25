import React,{useState, useEffect} from 'react';
import './panel.css';
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {RemoveNewMedia, addNewCategoryR,RemoveNewCategoryR, addNewItemToShopRoute, EditItemFromShopRoute, addNewZestawToShopRoute, EditZestawFromShopRoute, addNewFcodeToShopRoute, RemoveFcodeFromShop} from '../utils/APIRoutes';
import $ from 'jquery';
import { BiErrorAlt ,BiBarChart} from "react-icons/bi";
import { ImContrast } from "react-icons/im";
import {Line} from 'react-chartjs-2';
import{ Chart as ChartJS,LineElement,LinearScale,PointElement,CategoryScale,Tooltip,Filler} from 'chart.js';

const Inpanel = ({currentUser,server}) => {
    const navigate = useNavigate()
    const [currentUserName,setCurrentUserName] = useState(undefined);
    const [currentServer,setCurrentServer] = useState(undefined);
    const [option,setOption] = useState(undefined);
    const [optione,setOptione] = useState(undefined);
    const [type,setType] = useState(undefined);
    const [themes,setThemes] = useState([]);
    const [valuesAddNewItem,setValuesAddNewItem] = useState({
        itemid:"",
        link:"",
        name:"",
        label:"",
        opis:"",
        cena:"",
        category:"Wszystko",
    })
    const [valuesEditItem,setValuesEditItem] = useState({
        itemid:"",
        link:"",
        name:"",
        label:"",
        opis:"",
        cena:"",
        category:"Wszystko",
        oldName:""
    })
    const [valuesAddNewZestaw,setValuesAddNewZestaw] = useState({
        itemid:"",
        link:"",
        label:"",
        opis:"",
        cena:"",
        cenaold:"",
        oldName:""
    })
    const [valuesEditZestaw,setValuesEditZestaw] = useState({
        itemid:"",
        link:"",
        label:"",
        opis:"",
        cena:"",
        cenaold:"",
        oldName:""
    })
    const [valuesAddNewfcode,setValuesAddNewfcode] = useState({
        code:"",
        ussages:"",
        pro:"",
    })
    const [dataChart, setDataChart] = useState({
        labels:[],
        datasets:[{
            data:[],
            borderColor: '#5138ee',
            color:'#fff',
            pointBorderWidth: 1,
            backgroundColor:['#5138ee'],
            tension: 0.4,
            fill: true,
        }]
    })
    const [optionsChart, setOptionsChart] = useState({
        responsive : true,
        maintainAspectRatio: false,

        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('pl', { style: 'currency', currency: 'PLN' }).format(context.parsed.y);
                        }
                        return label;
                    }

                }
               
            },
            legend: {
               display:false
            },
          
        },        
        scales:{
            x:{
                grid:{
                    display: false
                },
                ticks:{
                    color:'#fff',
                    font: {
                        family: "'Montserrat', sans-serif",
                    },    
                },
            },
            y:{
                min:0,
                max:10000,
                ticks:{
                    stepSize: 1000,
                    callback:(value) => value+'zł',
                    color:'#fff',
                    font: {
                        family: "'Montserrat', sans-serif",
                    },   
                    
                },
                grid:{
                    display: false
                }
                
            }
        }
    })
    useEffect(()=>{
        async function GDzssdasdasd(){
            if(server != undefined){
            let labels = [];
            let data = [];
            let step,max
            let cando = 0
            server.moneyHist = server.moneyHist.slice(-30)
            for(let i in server.moneyHist){
    
                labels.push(server.moneyHist[i].date)
                data.push(server.moneyHist[i].price)
                cando = cando +1
            }
            if(cando > 3){
                if(Math.round(Math.max(...data)/1000)*1000 < Math.max(...data)){
                    max = (Math.round(Math.max(...data)/1000)*1000) + 4000
                }else{
                    max = (Math.round(Math.max(...data)/1000)*1000)
                }
                if(Math.max(...data) < 1000){
                    step = 100
                }else{
                    step = 1000
                }
                setDataChart({
                
                    labels:labels,
                    datasets:[{
                        data:data,
                        borderColor: '#5138ee',
                        pointBorderWidth: 1,
                        backgroundColor:['rgba(81, 56, 238, 0.2)'],
                        tension: 0.4,
                    }]
                })
                setOptionsChart({
                    responsive : true,
                    maintainAspectRatio: false,
                    responsiveAnimationDuration: 0,
                    animation: {
                        duration: 1.5
                    },
                    plugins: {
                        tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
            
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('pl', { style: 'currency', currency: 'PLN' }).format(context.parsed.y);
                                }
                                return label;
                            }
            
                        }
                        },
                        legend: { display: false }
                    },        
                    scales:{
                        x:{
                            grid:{
                                display: false
                            }
                        },
                        y:{
                            min:0,
                           
                            ticks:{
                                stepSize: step,
                                callback:(value) => value+'zł'
                            },
                            grid:{
                                display: false
                            }
                            
                        }
                    }
                })
                document.querySelector('.dupa').style ="display:none"
            }else{
                document.querySelector('.dupa').style ="display:block"
            }
            }
            
        }
        
        GDzssdasdasd()
        },[server]);
    ChartJS.register(
        LineElement,
        CategoryScale,
        LinearScale,
        PointElement,
        Tooltip,
        Filler
    )
    const toastOptions={
        position: 'bottom-left',
        autoClose:3000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }
    useEffect(()=>{
        if(currentUser){
            setCurrentUserName(currentUser.username);
            setCurrentServer(currentUser.server)
            toast.success('zalogowano', toastOptions);
        }
    },[currentUser])
    useEffect(()=>{
        if(!option){
            setTimeout(() => {
                setOption(document.querySelector('.activeumenu'));
                
            }, 250);
        }
    },[option]);
    useEffect(()=>{
        if(!optione){
            setTimeout(() => {
                setOptione(document.querySelector('.editMenuItemActive'));
                
            }, 250);
        }
    },[optione]);
    const changeSection = (e)=>{
        if(e.target.getAttribute('datatype') != option.getAttribute('datatype')){
            if(document.querySelector(`.${e.target.getAttribute('datatype')}`)){
                document.querySelector(`.${e.target.getAttribute('datatype')}`).style ="transform: translateY(0%);"
                document.querySelector(`.${option.getAttribute('datatype')}`).style ="transform: translateY(100%);"
                option.classList.remove('activeumenu'); 
                e.target.classList.add('activeumenu')
                setOption(e.target);
            }
        }
        
    }
    useEffect(()=>{
        let tab = []
        for(let i in motywy){
            // document.documentElement.style.setProperty(`--${i}`,motywy[i]);
            
            tab.push({name:i,motyw:motywy[i]})

        }
        setThemes(tab)
    },[])
    let motion 
    if(localStorage.getItem('motion') === undefined){
        motion = false
    }else{
        motion = localStorage.getItem('motion')
    }
    if(motion === "true"){
        document.documentElement.style.setProperty('--bgColor', '#F0F0F0');
        document.documentElement.style.setProperty('--bgColorP', '#5138ee');
        document.documentElement.style.setProperty('--cfgBg', '#FAF9FF');
        document.documentElement.style.setProperty('--txtcolor', '#EEEEEE');
        document.documentElement.style.setProperty('--stxtcolor', '#5138ee');
        document.documentElement.style.setProperty('--borderscolor', '#CCCCCC');
        document.documentElement.style.setProperty('--borderscolorT', '#CCCCCC');
        document.documentElement.style.setProperty('--blacktxt', '#0a0909');
        motion = false
    }else{
        document.documentElement.style.setProperty('--bgColor', '#222b40');
        document.documentElement.style.setProperty('--bgColorP', '#141B2D');
        document.documentElement.style.setProperty('--cfgBg', '#141B2D');
        document.documentElement.style.setProperty('--txtcolor', '#EEEEEE');
        document.documentElement.style.setProperty('--stxtcolor', '#5138ee');
        document.documentElement.style.setProperty('--borderscolor', '#cccccc00');
        document.documentElement.style.setProperty('--borderscolorT', '#cccccc');
        document.documentElement.style.setProperty('--blacktxt', '#FFF');
        motion = true
    }  
    const changeMotion = (e)=>{
        
        if(motion){
            document.documentElement.style.setProperty('--bgColor', '#F0F0F0');
            document.documentElement.style.setProperty('--bgColorP', '#5138ee');
            document.documentElement.style.setProperty('--cfgBg', '#FAF9FF');
            document.documentElement.style.setProperty('--txtcolor', '#EEEEEE');
            document.documentElement.style.setProperty('--stxtcolor', '#5138ee');
            document.documentElement.style.setProperty('--borderscolor', '#CCCCCC');
            document.documentElement.style.setProperty('--borderscolorT', '#CCCCCC');
            document.documentElement.style.setProperty('--blacktxt', '#0a0909');
            localStorage.removeItem('motion');
            localStorage.setItem('motion',true)
            motion = false
        }else{
            document.documentElement.style.setProperty('--bgColor', '#222b40');
            document.documentElement.style.setProperty('--bgColorP', '#141B2D');
            document.documentElement.style.setProperty('--cfgBg', '#141B2D');
            document.documentElement.style.setProperty('--txtcolor', '#EEEEEE');
            document.documentElement.style.setProperty('--stxtcolor', '#5138ee');
            document.documentElement.style.setProperty('--borderscolor', '#cccccc00');
            document.documentElement.style.setProperty('--borderscolorT', '#cccccc');
            document.documentElement.style.setProperty('--blacktxt', '#FFF');
            localStorage.removeItem('motion');
            localStorage.setItem('motion',false)
            motion = true
        }
    }
    const logoutUp = ()=>{
        localStorage.clear()
        navigate('/')
    }
    const SMUPclose = (e) =>{
        document.querySelector('.ServerMenagmentUserP').style = "transform: translateX(80%) ;";
        document.querySelector('.UserPanelEditPage').style.overflowY = "auto";

        
    }
    const noafasfasf = (e) =>{
        document.querySelector('.ServerMenagmentUserP').style = "transform: translateX(-25.5%) ;";
        document.querySelector('.UserPanelEditPage').style.overflowY = "hidden" ;
    }
    const addNewCategory = async (e)=>{
       let category = document.getElementById('ADcU').value
       let serv = server.server
       if(category.length <= 0)
        return toast.error('Zła wartość pola',toastOptions);

       const data = await axios.post(addNewCategoryR,{
        serv,
        category
       })

       if(data.data.status === true){
        toast.success(data.data.msg,toastOptions)
       }else{
        toast.error(data.data.msg,toastOptions)
       }
    }
    const RemoveCat = async (e)=>{
       let cat = e.target.getAttribute('data-category')
       let serv = server.server
       const data = await axios.post(RemoveNewCategoryR,{
        serv,
        cat
       })
       if(data.data.status === true){
        toast.success(data.data.msg,toastOptions)
       }else{
        toast.error(data.data.msg,toastOptions)
       }
    }
    const RemoveMedia = async (e)=>{
        let media = e.target.getAttribute('data-category')
        let serv = server.server
        const data = await axios.post(RemoveNewMedia,{
         serv,
         media
        })
        if(data.data.status === true){
         toast.success(data.data.msg,toastOptions)
        }else{
         toast.error(data.data.msg,toastOptions)
        }
     }
    const changeEdits = (e)=>{
        if(e.target.getAttribute('datatype') != optione.getAttribute('datatype')){
            if(document.querySelector(`.${e.target.getAttribute('datatype')}`)){
                document.querySelector(`.${e.target.getAttribute('datatype')}`).style ="transform: translateY(0%);"
                document.querySelector(`.${optione.getAttribute('datatype')}`).style ="transform: translateY(100%);"
                optione.classList.remove('editMenuItemActive'); 
                e.target.classList.add('editMenuItemActive')
                if(e.target.getAttribute('datatype') === 'motyw'){
                    document.querySelector('.themeOptions').style = 'transform: translateY(0%);'
                }
                setOptione(e.target);
                
            }
        }
    }
    const closeThemes = (e)=>{
        document.querySelector('.themeOptions').style = 'transform: translateY(100%);'
        setOptione(document.querySelector('.editMenuItemActive'));
    }
    /*Zarzadzanie Przedmiotami*/

    //dodawanie
    const ShowAddNewItemToShop = function(){
        document.querySelector('.AddNewItemToShop.n').style = 'transform: translateX(-50%);'
    }
    const HideAddNewItemToShop = function(){
        document.querySelector('.AddNewItemToShop.n').style = 'transform: translateX(250%);'
    }
    const addNewItemToShop = async function(){
        let value = valuesAddNewItem
        let sname = server.server
        const {data} = await axios.post(addNewItemToShopRoute,{
            value,
            sname
        })
        if(data.status === true){
            toast.success(data.msg,toastOptions)
            window.top.location = window.top.location
        }else{
            toast.error(data.msg,toastOptions)
            window.top.location = window.top.location
        }
    }
    const handleNewItem = (event)=>{
        setValuesAddNewItem({...valuesAddNewItem,[event.target.name]: event.target.value})     
    }

    //edycja
    const ShowEditItemFromShop = function(itemID, link, category, name, label, desc, price){
        document.querySelector('.AddNewItemToShop.u').style = 'transform: translateX(-50%);';
        document.getElementById('EdID').value = itemID;
        document.getElementById('EdLtoImg').value = link;
        document.getElementById('Edname').value = name;
        document.getElementById('Edlabela').value = label;
        document.getElementById('Eddesc').value = desc;
        document.getElementById('Edprice').value = price;
        document.getElementById('Edopt').value = category;
        setValuesEditItem({oldName: itemID, itemid:itemID, link:link, name:name, label:label, opis:desc, cena:price, category:category})
        
    }
    const HideEditItemFromShop = function(){
        document.querySelector('.AddNewItemToShop.u').style = 'transform: translateX(250%);'
    }
    const EditItemFromShop = async function(){
        let value = valuesEditItem;
        let remove = false;
        let sname = server.server;
        const {data} = await axios.post(EditItemFromShopRoute,{
            value,
            sname,
            remove
        })
        if(data.status === true){
            toast.success(data.msg,toastOptions)
            window.top.location = window.top.location
        }else{
            toast.error(data.msg,toastOptions)
            window.top.location = window.top.location
        }
    }
    const RemoveItemFromShop = async function(){
        let remove = true;
        let value = valuesEditItem;
        let sname = server.server;
        const {data} = await axios.post(EditItemFromShopRoute,{
            remove,
            value,
            sname
        })
        if(data.status === true){
            toast.success(data.msg,toastOptions)
            window.top.location = window.top.location
        }else{
            toast.error(data.msg,toastOptions)
            window.top.location = window.top.location
        }
    }
    const handleEditItem = (event)=>{
        setValuesEditItem({...valuesEditItem,[event.target.name]: event.target.value})     
    }

    /*Zarządzanie Zestawami*/ 

    //dodawanie

    const ShowAddNewZestawShop = function(){
        document.querySelector('.AddNewItemToShop.zn').style = 'transform: translateX(-50%);'
    }
    const HideAddNewZestawShop = function(){
        document.querySelector('.AddNewItemToShop.zn').style = 'transform: translateX(250%);'
    }
    const addNewZestawToShop = async function(){
        let value = valuesAddNewZestaw
        let sname = server.server
        const {data} = await axios.post(addNewZestawToShopRoute,{
            value,
            sname
        })
        if(data.status === true){
            toast.success(data.msg,toastOptions)
            window.top.location = window.top.location
        }else{
            toast.error(data.msg,toastOptions)
            window.top.location = window.top.location
        }
    }
    const handleNewZestaw = (event)=>{
        setValuesAddNewZestaw({...valuesAddNewZestaw,[event.target.name]: event.target.value})     
    }

    //edycja
    const ShowEditZestawFromShop = function(itemID, link, label, desc, price, oldprice){
        document.querySelector('.AddNewItemToShop.zu').style = 'transform: translateX(-50%);';
      
        document.getElementById('EdnID').value = itemID;
        document.getElementById('EdnLtoImg').value = link;
        document.getElementById('Ednlabela').value = label;
        document.getElementById('Edndesc').value = desc;
        document.getElementById('Ednprice').value = price;
        document.getElementById('Ednpriceo').value = oldprice;
        setValuesEditZestaw({oldName: itemID, itemid:itemID, link:link,label:label, opis:desc, cena:price, cenaold:oldprice})
        
    }
    const HideEditZestawFromShop = function(){
        document.querySelector('.AddNewItemToShop.zu').style = 'transform: translateX(250%);'
    }
    const EditZestawFromShop = async function(){
        let value = valuesEditZestaw;
        let remove = false;
        let sname = server.server;
        const {data} = await axios.post(EditZestawFromShopRoute,{
            value,
            sname,
            remove
        })
        if(data.status === true){
            toast.success(data.msg,toastOptions)
            window.top.location = window.top.location
        }else{
            toast.error(data.msg,toastOptions)
            window.top.location = window.top.location
        }
    }
    const RemoveZestawFromShop = async function(){
        let remove = true;
        let value = valuesEditItem;
        let sname = server.server;
        const {data} = await axios.post(EditZestawFromShopRoute,{
            remove,
            value,
            sname
        })
        if(data.status === true){
            toast.success(data.msg,toastOptions)
            window.top.location = window.top.location
        }else{
            toast.error(data.msg,toastOptions)
            window.top.location = window.top.location
        }
    }
    const handleEditZestaw = (event)=>{
        setValuesEditZestaw({...valuesEditZestaw,[event.target.name]: event.target.value})     
    }

    /*kody Rabatowe*/ 

    //dodawanie
    const handleNewfcode = (event)=>{
        setValuesAddNewfcode({...valuesAddNewfcode,[event.target.name]: event.target.value})     
    }
    const addNewFcodeToShop = async function(){
        let value = valuesAddNewfcode
        let sname = server.server
        const {data} = await axios.post(addNewFcodeToShopRoute,{
            value,
            sname
        })
        if(data.status === true){
            toast.success(data.msg,toastOptions)
            window.top.location = window.top.location
        }else{
            toast.error(data.msg,toastOptions)
            window.top.location = window.top.location
        }
    }
    //usuwanie
    const removeFcodeFromShop = async function(code){
   
        let sname = server.server
        const {data} = await axios.post(RemoveFcodeFromShop,{
            code,
            sname
        })
        if(data.status === true){
            toast.success(data.msg,toastOptions)
            window.top.location = window.top.location
        }else{
            toast.error(data.msg,toastOptions)
            window.top.location = window.top.location
        }
    }
    const items = server.allItems;
    const widhist = server.lastWidth;
    const puhhist = server.puhHist;
    const feedcodes = server.feecode;
    const itemscategory = server.itemscategory;
    const zestawy = server.zestawy;
    const socials = server.socials;
    const motywy = server.serverStyle[0];
    return (
        <div className="UserPanelHolder">
            <div className="UserPanelmenu"> 
                <div className="logoMenuUP" >
                    <img src="https://cdn.discordapp.com/attachments/702788153022480477/1085665680273186931/mlogo.png" alt="" srcset="" width='250px'/>
                </div>
                <p className='activeumenu' datatype='UserPanelMainPage' onClick={(e)=>changeSection(e)}><i className="fa-solid fa-house"></i> Strona Główna</p>
                <p datatype='UserPanelLastClient' onClick={(e)=>changeSection(e)}><i className="fa-solid fa-user"></i> Ostatni Klienci</p>
                <p datatype='UserPanelEditPage' onClick={(e)=>changeSection(e)}><i className="fa-solid fa-pen-to-square"></i> Edytuj Sklep</p>
                <p datatype='UserPanelRecipes' onClick={(e)=>changeSection(e)}><i className="fa-solid fa-receipt"></i> Kody Rabatowe</p>
                {/* <p datatype='mopt4' onClick={(e)=>changeSection(e)}><i className="fa-solid fa-rotate-left"></i> Zwroty</p> */}
                <div className='logoutUpanel' onClick={(e)=>logoutUp(e)}><i className="fa-solid fa-right-from-bracket"></i> Wyloguj się</div>
            </div>
            <main className='UserPanelMain'>
                <section className="UserPanelMainPage">
                    <p className="stitle">
                        Panel Główny
                        <span>Witaj {server.owner}</span>
                    </p>
                    <div className="changeMotion" onClick={(e)=>changeMotion(e)}>
                        <i className="fa-solid fa-circle-half-stroke"></i>
                    </div>
                    <div className="moneyChart">
                        <h3>Wykres płatności</h3>
                        <div className="gowno">
                            <div className="dupa">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                <p>Za Mało Danych!</p>
                            </div>
                            <Line className='wykres' data={dataChart} options={optionsChart}></Line>
                        </div>
                    </div>
                    <div className="LastWidthUPEI">
                        <h3>Historia Wypłat</h3>
                        <div className="noeloeloscroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID wypłat</th>
                                        <th>Kwota</th>
                                        <th>Data</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {widhist !== undefined?(
                                        widhist.map((ww,index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td><span className='realizedWW'>{ww.status === true?"Zrealizowana":"Oczekuje"}</span> </td>
                                                    <td>{ww.date}</td>
                                                    <td>{ww.value}zł</td>
                                                    <td className='WIDID'>{ww.id}</td>
                                                </tr>
                                                
                                            );
                                        })):""
                                    }
                                    
                                </tbody>
                            </table>            
                        </div>
                    </div>
                    <div className="AccountMPinfo">
                        <div className="accBalance">
                            <div>
                                <p>
                                    Kwota do wypłaty
                                    <div>{server.accbal.toFixed(2)} zł</div>
                                </p>
                            </div>
                        </div>
                       
                    </div>
                </section>
                <section className="UserPanelLastClient">
                   <div className="allClientsUP">
                     
                        <div className="LCUPTAB">
                        <h3>Klienci</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID zakupu</th>
                                        <th>Nick</th>
                                        <th>Brutto</th>
                                        <th>Netto</th>
                                        <th>Nazwa</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {puhhist !== undefined?(
                                        puhhist.map((puh,index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td>{new Date(puh.date).toLocaleDateString()}</td>
                                                    <td>{puh.status}</td>
                                                    <td><span >{puh.item}</span></td>
                                                    <td>{puh.kwotan} zł</td>
                                                    <td>{puh.kwotab} zł</td>
                                                    <td>{puh.nick}</td>
                                                    <td>{puh.id}</td>
                                                    
                                                </tr>
                                            );
                                        })):""
                                    }
                                        
                                </tbody>
                            </table>
                        </div>   
                   </div>
                </section>
                <section className="UserPanelEditPage">
                    <div className="upepContent">
                        <div className="Allitems">
                            <div className="przedmioty Allitemscategory">
                                <div style={{cursor:'pointer'}} onClick={(e)=>ShowAddNewItemToShop(e)} className="AddNewPrzedmiot">
                                    <span id='jyurwa' style={{cursor:'pointer',zIndex:'99999999'}} onClick={(e)=>ShowAddNewItemToShop(e)} >Dodaj Przedmiot</span>
                                </div>
                                <h3>Wszystkie Przedmioty</h3>
                                <div className="itemsTable ">
                                {items !== undefined?(
                                    items.map((item, index)=>{
                                        
                                        return(
                                        <div className='UserPanelEditItem' key={index}>
                                            <div className="UPEIimg">
                                                <img src={item.itemImg} title={item.itemImg} srcset="" />
                                            </div>
                                            <div className="UPEIinfo">
                                            <div className="UPEIitemID">
                                                    <span>ID:</span> {item.itemid}
                                                </div>
                                                <div className="UPEIitemName">
                                                    <span>Nazwa:</span> {item.itemname}
                                                </div>
                                                <div className="UPEIitemCategory">
                                                    <span>Kategoria:</span> {item.itemcategory}
                                                </div>
                                                <div className="UPEIitemLabel">
                                                    <span>Label:</span> {item.itemlabel}
                                                </div>
                                                <div className="UPEIitemDesc">
                                                    <span>Opis:</span> {item.itemdesc}
                                                </div>
                                                <div className="UPEIitemPrice">
                                                    <span>Cena:</span> {item.itemprice}zł
                                                </div>
                                            </div>
                                            <div className="editItemVal" onClick={(e)=>ShowEditItemFromShop(item.itemid,item.itemImg,item.itemcategory,item.itemname,item.itemlabel,item.itemdesc,item.itemprice)}>
                                                    Edytuj Przedmiot
                                            </div>
                                        </div>
                                        
                                        )
                                    })
                                ):''
                                }
                                </div>
                                <div className="AddNewItemToShop n">
                                    <h2>Dodaj Przedmiot</h2>
                                    <input id='AdID' name='itemid' onChange={(e)=>handleNewItem(e)} type="text" placeholder='nadaj id musi być unikalne!!!'/>
                                    <input id='AdLtoImg' name='link' onChange={(e)=>handleNewItem(e)} type="text" placeholder='link do zdjęcia'/>
                                    <input id='Adname' name='name' onChange={(e)=>handleNewItem(e)} type="text" placeholder='name'/>
                                    <input id='Adlabela' name='label' onChange={(e)=>handleNewItem(e)} type="text" placeholder='label'/>
                                    <input id='Addesc' name='opis' onChange={(e)=>handleNewItem(e)} type="text" placeholder='opis'/>
                                    <input id='Adprice' name='cena' onChange={(e)=>handleNewItem(e)} type="number" placeholder='cena'/>
                                    <select id='Adopt' name='category' onChange={(e)=>handleNewItem(e)} >
                                        {
                                            itemscategory.map((category,index)=>{
                                                
                                                return(
                                                    <option key={index} value={category.category}>{category.category}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <div className='SubAddNewItem' onClick={(e)=>addNewItemToShop(e)}>Dodaj Przedmiot</div>
                                    <div className='SubAddNewItem canal' onClick={(e)=>HideAddNewItemToShop(e)}>Anuluj</div>
                                </div>
                                <div className="AddNewItemToShop u">
                                    <h2>Edytuj Przedmiot</h2>
                                    <input id='EdID' name='itemid' onChange={(e)=>handleEditItem(e)} type="text" placeholder='nadaj id może być takie same'/>
                                    <input id='EdLtoImg' name='link' onChange={(e)=>handleEditItem(e)} type="text" placeholder='link do zdjęcia'/>
                                    <input id='Edname' name='name' onChange={(e)=>handleEditItem(e)} type="text" placeholder='name'/>
                                    <input id='Edlabela' name='label' onChange={(e)=>handleEditItem(e)} type="text" placeholder='label'/>
                                    <input id='Eddesc' name='opis' onChange={(e)=>handleEditItem(e)} type="text" placeholder='opis'/>
                                    <input id='Edprice' name='cena' onChange={(e)=>handleEditItem(e)} type="number" placeholder='cena'/>
                                    <select id='Edopt' name='category' onChange={(e)=>handleEditItem(e)} >
                                        {
                                            itemscategory.map((category,index)=>{
                                                
                                                return(
                                                    <option key={index} value={category.category}>{category.category}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <div className='SubAddNewItem' onClick={(e)=>EditItemFromShop(e)}>Zaaktualizuj Przedmiot</div>
                                    <div className='SubAddNewItem remove' onClick={(e)=>RemoveItemFromShop(e)}>Usuń Przedmiot</div>
                                    <div className='SubAddNewItem canal' onClick={(e)=>HideEditItemFromShop(e)}>Anuluj</div>
                                </div>
                            </div>
                            <div className="kategorie Allitemscategory">
                                <div className="AddNewCategory">
                                    <input type="text" name="" id="ADcU" placeholder='Nazwa Kategori'/>
                                    <span id='jyurwa' onClick={(e)=>addNewCategory(e)}>Dodaj Kategorie</span>
                                </div>
                                <h3>Wszystkie kategorie</h3>
                                <div className="AllCategories">
                                {
                                    itemscategory.map((category,index)=>{
                                    return(
                                        category.remov !== false ?(
                                            <div  className="CategoryItemEz"  key={index}>
                                                <div className="CatTitle">
                                                    {category.category}
                                                </div>
                                                <div onClick={(e)=>RemoveCat(e)} data-category={category.category} className="CatRemove">
                                                    Usuń kategorie
                                                </div>
                                            </div>
                                        ):(
                                            <div className="CategoryItemEz" key={index}>
                                                <div className="CatTitle">
                                                    Nazwa: {category.category}
                                                </div>
                                                <div className="CantRemove">
                                                    Usuń kategorie
                                                </div>
                                            </div>
                                        )
                                    
                                    )})
                                    
                                }
                                </div>
                            </div>
                            <div className="zestawy Allitemscategory">
                                <div className="AddNewZestaw">
                                    <span id='jyurwa' onClick={(e)=>ShowAddNewZestawShop(e)}>Dodaj Zestaw</span>
                                </div>
                                <h3>Wszystkie Zestawy</h3>
                                <div className="allComplets">
                                    {
                                        zestawy !== undefined?(
                                           zestawy.map((zestaw,index)=>{
                                            return(
                                                <div className="Complet" key={index}>
                                                    <div className="Compleft">
                                                        <img src={zestaw.zestawImg} alt="image" />
                                                    </div>
                                                    <div className="Compright">
                                                        <div className="zestawTitle"><span>ID:</span> {zestaw.zestawid}</div>
                                                        <div className="zestawTitle"><span>Nazwa:</span> {zestaw.zestawtTitle}</div>
                                                        <div className="zestawDesc"><span>Opis:</span> {zestaw.zestawDesc}</div>
                                                        <div className="zestawDesc"><span>Cena:</span> {zestaw.zestawPrice}zł</div>
                                                        <div className="zestawDesc"><span>Przecen:</span> {zestaw.zestawOldPrice}zł</div>
                                                    </div>
                                                    <div className="EditComp" onClick={(e)=>ShowEditZestawFromShop(zestaw.zestawid,zestaw.zestawImg,zestaw.zestawtTitle,zestaw.zestawDesc,zestaw.zestawPrice,zestaw.zestawOldPrice)}>
                                                        Edytuj Zestaw
                                                    </div>
                                                </div>
                                            );
                                           })
                                        ):""
                                    }
                                </div>
                                <div className="AddNewItemToShop zn">
                                    <h2>Dodaj Zestaw</h2>
                                    <input id='AdnID' name='itemid' onChange={(e)=>handleNewZestaw(e)} type="text" placeholder='nadaj id musi być unikalne!!!'/>
                                    <input id='AdnLtoImg' name='link' onChange={(e)=>handleNewZestaw(e)} type="text" placeholder='link do zdjęcia'/>
                                    <input id='Adnlabela' name='label' onChange={(e)=>handleNewZestaw(e)} type="text" placeholder='label'/>
                                    <input id='Adndesc' name='opis' onChange={(e)=>handleNewZestaw(e)} type="text" placeholder='opis'/>
                                    <input id='Adnprice' name='cena' onChange={(e)=>handleNewZestaw(e)} type="number" placeholder='cena'/>
                                    <input id='Adnprice' name='cenaold' onChange={(e)=>handleNewZestaw(e)} type="number" placeholder='stara cena'/>
                                    <div className='SubAddNewItem' onClick={(e)=>addNewZestawToShop(e)}>Dodaj Zestaw</div>
                              
                                    <div className='SubAddNewItem canal' onClick={(e)=>HideAddNewZestawShop(e)}>Anuluj</div>
                                </div>
                                <div className="AddNewItemToShop zu">
                                    <h2>Edytuj Zestaw</h2>
                                    <input id='EdnID' name='itemid' onChange={(e)=>handleEditZestaw(e)} type="text" placeholder='nadaj id musi być unikalne!!!'/>
                                    <input id='EdnLtoImg' name='link' onChange={(e)=>handleEditZestaw(e)} type="text" placeholder='link do zdjęcia'/>
                                    <input id='Ednlabela' name='label' onChange={(e)=>handleEditZestaw(e)} type="text" placeholder='label'/>
                                    <input id='Edndesc' name='opis' onChange={(e)=>handleEditZestaw(e)} type="text" placeholder='opis'/>
                                    <input id='Ednprice' name='cena' onChange={(e)=>handleEditZestaw(e)} type="number" placeholder='cena'/>
                                    <input id='Ednpriceo' name='cenaold' onChange={(e)=>handleEditZestaw(e)} type="number" placeholder='stara cena'/>
                                    <div className='SubAddNewItem' onClick={(e)=>EditZestawFromShop(e)}>Edytuj Zestaw</div>
                                    <div className='SubAddNewItem remove' onClick={(e)=>RemoveZestawFromShop(e)}>Usuń Przedmiot</div>
                                    <div className='SubAddNewItem canal' onClick={(e)=>HideEditZestawFromShop(e)}>Anuluj</div>
                                </div>
                            </div>
                            <div className="social Allitemscategory">
                                <div className="AddNewCategory Media">
                                        <input type="text" name="" id="ADcU" placeholder='Nazwa Medi'/>
                                        <input type="text" name="" id="ADcU" placeholder='FONT AWESOME NP(fa-brands fa-discord)'/>
                                        <input type="text" name="" id="ADcU" placeholder='LINK'/>
                                        <span id='jyurwa' onClick={(e)=>addNewCategory(e)}>Dodaj Media</span>
                                    </div>
                                    <h3>Wszystkie Media</h3>
                                    <div className="AllCategories">
                                    {
                                        socials.map((social,index)=>{
                                        return(  
                                            <div  className="CategoryItemEz"  key={index}>
                                                <div className="CatTitle">
                                                    Nazwa: {social.name}<br></br>
                                                    Ikona FontAwesome: {social.icon}<br></br>
                                                    Link: {social.link}<br></br>
                                                </div>
                                                <div onClick={(e)=>RemoveMedia(e)} style={{textAlign:'center'}} data-category={social.name} className="CatRemove">
                                                    Usuń Media
                                                </div>
                                            </div>
                                            )
                                        })
                                        
                                    }
                                </div>
                            </div>
                            <div className="motyw Allitemscategory">
                            </div>
                        </div>
                        <div className="themeOptions">
                            <div className="closeThemes" onClick={(e)=>closeThemes(e)}>
                                <i className="fa-solid fa-x"></i>
                            </div>
                            <div className="AllTheme">
                                {
                                    themes.length > 0?(
                                        themes.map((theme,index)=>{
                                            return(
                                                <div className="themea" key={index}>
                                                    <div className="thTitle">{theme.name}</div>
                                                    <input type="color" value={theme.motyw} className="thColor" name={theme.name}/>
                                                </div>
                                            );
                                         })
                                    ):""
                                }
                            </div>
                        </div>
                        <div className="editMenu">
                            <div onClick={(e)=>changeEdits(e)} datatype="przedmioty" className="editMenuItem editMenuItemActive">Przedmioty</div>
                            <div onClick={(e)=>changeEdits(e)} datatype="zestawy" className="editMenuItem">Zestawy</div>
                            <div onClick={(e)=>changeEdits(e)} datatype="kategorie" className="editMenuItem">Kategorie</div>            
                            <div onClick={(e)=>changeEdits(e)} datatype="social" className="editMenuItem">Social Media</div>
                            <div datatype="motyw" className="editMenuItem"><i className="fa-solid fa-lock "></i> Motyw Sklepu </div>
                        </div>
                    </div>  
                </section>
                <section className="UserPanelRecipes">
                    <div className="recipecontainer">
                        <div className="asdasdasd">
                            <div className="generateRecipe">
                                <h3>Generuj Kod</h3>
                                <div className="genCodefee">
                                    <input type="text" name="code" onChange={(e)=>handleNewfcode(e)} placeholder="Nazwa kodu" id="" className="niemampomyslu" />
                                    <input type="text" name="ussages" onChange={(e)=>handleNewfcode(e)} placeholder="Ilość użyć" id="" className="niemampomyslu" />
                                    <input type="text" name="pro" onChange={(e)=>handleNewfcode(e)} placeholder="% zniżki" id="" className="niemampomyslu" />
                                </div>
                                <div className="addNewFeeCode" onClick={(e)=>addNewFcodeToShop(e)}>Dodaj</div>

                            </div>
                            <div className="AvaibleRecipes">
                                <h3>Aktywne Kody</h3>
                                <table>
                                <thead>
                                    <tr>
                                        <th>Nazwa</th>
                                        <th>Pozostałe Użycia</th>
                                        <th>Zniżka</th>
                                        <th>Edycja</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedcodes !== undefined?(
                                        feedcodes.map((code,index)=>{
                                            if(code.ussages > 0){
                                                return(
                                                    <tr key={index}>
                                                        <td>{code.code}</td>
                                                        <td>{code.ussages}</td>
                                                        <td>{code.pro}%</td>
                                                        <td>
                                                            <span className='DelCodFee' style={{color:"#fff"}} onClick={(e)=>removeFcodeFromShop(code.code)}>Usuń</span>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                           
                                        })):""
                                    }
                                        
                                </tbody>
                            </table>
                            </div>
                        </div>
                        <div className="RecipesHistory">
                            <h3>Historia Kodów</h3>
                            
                           
                            <table>
                            <thead>
                                <tr>
                                    <th>Nazwa</th>
                                    <th>Ilość użyć</th>
                                    <th>Zniżka</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {feedcodes !== undefined?(
                                    feedcodes.map((code,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{code.code}</td>
                                                <td>{code.setuse}</td>
                                                <td>{code.pro}%</td>
                                                
                                            </tr>
                                        );
                                    })):""
                                }
                                    
                            </tbody>
                        </table>

                        </div>
                    </div>
                </section>
            </main>
        </div>   
    );
}

export default Inpanel;



