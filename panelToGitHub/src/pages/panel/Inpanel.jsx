import React,{useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios, { formToJSON } from "axios";
import $ from 'jquery';
import { BiErrorAlt ,BiBarChart} from "react-icons/bi";
import { ImContrast } from "react-icons/im";
import {Line} from 'react-chartjs-2';
import{ Chart as ChartJS,LineElement,LinearScale,PointElement,CategoryScale,Tooltip} from 'chart.js';
import { registerServer } from '../utils/APIRoutes';
const Inpanels = ({servers}) => {
    const navigate = useNavigate()
    const [currentServer,setCurrentServer] = useState(undefined)
    const [currentServerInfo,setCurrentServerInfo] = useState([])
    const [values,setValues] = useState({
        owner:"",
        servername:"",
        password:"",
        logo:""
    })
    const [dataChart, setDataChart] = useState({
        labels:['01.02.2023','02.02.2023','03.02.2023','04.02.2023','05.02.2023','05.02.2023','05.02.2023','05.02.2023','05.02.2023'],
        datasets:[{
            data:[8224, 7128,2226, 8111, 7111, 522, 6242,2122,3334,5222,6222],
            borderColor: '#323b61',
            pointBorderWidth: 1,
            backgroundColor:['black','red'],
            tension: 0.5,
        }]
    })
    const [optionsChart, setOptionsChart] = useState({
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
                max:10000,
                ticks:{
                    stepSize: 2000,
                    callback:(value) => value+'zł'
                },
                grid:{
                    display: false
                }
                
            }
        }
    })
    const toastOptions={
        position: 'bottom-left',
        autoClose:3000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }
    ChartJS.register(
        LineElement,
        CategoryScale,
        LinearScale,
        PointElement,
        Tooltip
    )
   
    const changeServer = (server,index,event) =>{
        setCurrentServer(index)
        setCurrentServerInfo(server)
    }

    useEffect(()=>{
        async function GD(){
          if(currentServer != undefined){
            let labels = [];
            let data = [];
            let step,max
            let cando = 0
            for(let i in currentServerInfo.moneyHist){
                labels.push(currentServerInfo.moneyHist[i].date)
                data.push(currentServerInfo.moneyHist[i].price)
                cando++
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
                        borderColor: 'rgb(24, 149, 207)',
                        pointBorderWidth: 1,
                        backgroundColor:'rgb(8, 6, 37)',
                        tension: 0.5,
                    }]
                })
                setOptionsChart({
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
                            max:max,
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
            }
          }
        }
        GD()
      },[currentServer]);


    const addNewServer = async (event)=>{
        event.preventDefault();
        
        const{servername,password,owner,logo} = values;
        if(Validation(servername,password,owner,logo)){
            const {data} = await axios.post(registerServer,{
                password,
                owner,
                servername,
                logo
            });
            if(data.status === false){
                toast.error(data.msg, toastOptions)
            }
            if(data.status === true){
                toast.success(data.msg, toastOptions)
            } 
        }
      
    }
    const Validation = (s,p,o,l)=>{
        
        if(s != "" && p != "" && o != "" && l != ""){
            return true;
        }else{
            toast.error('jakies pole jest puste', toastOptions)
            return false;
        }
    }
    const handleChange = (event)=>{
        setValues({...values,[event.target.name]: event.target.value})
    }
    const addNewServerDivShow = ()=>{
        document.querySelector('.addNewServerD').style ="display:block"
    }
    const cancelNewServerDivShow = ()=>{
        document.querySelector('.addNewServerD').style ="display:none"
    }
    const logoutUp = ()=>{
        localStorage.clear()
        window.location.reload(true)
    }
    return(
        <div className='containerPanelAdmin'>
            <div className="addNewServerD">
                <div className="closeNSD" onClick={(e)=>cancelNewServerDivShow(e)}>X</div>
                <form onSubmit={(event)=>addNewServer(event)}>
                    <input type="text" name="owner" placeholder='owner' id="awrawrawra" className='registerInput' onChange={(e)=> handleChange(e)} />
                    <input type="password" name="password" placeholder='Password' id="dawdawdawd" className='registerInput' onChange={(e)=> handleChange(e)} />
                    <input type="text" name="servername" placeholder='servername' id="awrawraaswra" className='registerInput' onChange={(e)=> handleChange(e)} />
                    <input type="text" name="logo" placeholder='logo' id="asdasdwwda" className='registerInput' onChange={(e)=> handleChange(e)} />
                    <button id='subReg' type='submit'><p>Dodaj Nowy Serwer</p></button>
                </form>
            </div>
            <div className="serversList">
                <div className="logoutMapan" onClick={(e)=>logoutUp(e)}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                </div>
                <div className="Slist">
                {servers.map((server, index)=>{
                    return(
                        <div key={index} data-server={server.server} className={`serverC ${index === currentServer ? 'active':''}`} onClick={(e)=>changeServer(server,index,e)}>
                            <span>{server.server}</span>
                        </div>
                    )
                })}
                </div>
                <div className="AddServer" onClick={(e)=>addNewServerDivShow(e)}>
                    <span>Dodaj Serwer</span>
                </div>
            </div>
            <div className="serverInfo">
                <div className="sipadding">
                    <div className="MoneyHist">
                        <h3>Historia Zarobków</h3>
                        <div className="ww">
                            <Line className='wykres' data={dataChart} options={optionsChart}></Line>
                        </div>
                    </div>
                    <div className="llp">
                        <h3>Ostatnie Zakupy</h3>
                        <div className="lastpuh">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nick</th>
                                        <th>Kwota Brutto</th>
                                        <th>Kwota Netto</th>
                                        <th>Item</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                currentServerInfo.puhHist !== undefined ?(
                                    currentServerInfo.puhHist.map((puh, index)=>{
                                        return(
                                        <tr key={index}>
                                            <td>{puh.id}</td>
                                            <td>{puh.nick}</td>
                                            <td>{puh.kwotab}</td>
                                            <td>{puh.kwotan}</td>
                                            <td>{puh.item}</td>
                                        </tr>
                                        )
                                    })
                                ):(undefined)
                           
                                }
                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="moneyInfoEz">
                    <div className="ActualMoney">
                        <h4>Aktualne Saldo</h4>
                        <p>2555zł</p>
                    </div>
                    <div className="LogHist">
                        <h4>Ostatnie Logowania</h4>
                        <div className="Thold">
                            <table>
                                <thead>
                                    <tr>
                                        <th>data</th>
                                        <th>IP</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {
                               
                                    currentServerInfo.LogHist !== undefined ?(
                                        currentServerInfo.LogHist.map((log, index)=>{
                                            
                                            return(
                                            <tr key={index}>
                                                <td>{log.data}</td>
                                                <td>{log.ip}</td>
                                                <td>{log.status === true?'Przyznano':'Odmowa'}</td>

                                            </tr>
                                            )
                                        })
                                    ):(undefined)
                               
                                    }
                                   
                                </tbody>
                            </table>
                        </div>
                        <div className="endoftabez"></div>
                    </div>
                </div>
            </div>
        <ToastContainer/>
        </div>
    );
}
export default Inpanels;