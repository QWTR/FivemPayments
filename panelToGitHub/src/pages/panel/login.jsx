import React,{useState, useEffect} from 'react';
import './panel.css'
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {
    const navigate = useNavigate()
    const [values,setValues] = useState({
        username:"",
        password:"",
    })
    const toastOptions={
        position: 'bottom-left',
        autoClose:5000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }
    useEffect(()=> {
        if(localStorage.getItem('app-user')){
            if(JSON.parse(localStorage.getItem('app-user')).type != 'jebanyprzechujezzzzzz'){
                navigate("/panelu")
            }else{

            }
        }
    },[])
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            const{password,username} = values;
            const {data} = await axios.post(loginRoute,{
                username,
                password,
            });
            if(data.status === false){
                toast.error(data.msg, toastOptions)
            }
            if(data.status === true){
                if(!localStorage.getItem('app-user')){
                    localStorage.setItem('app-user',JSON.stringify(data.user))
                }
                if(data.user.type != 'jebanyprzechujezzzzzz'){
                    window.location.reload(true)
                    navigate("/panelu")
                }else{
                    window.location.reload(true)
                }
            }
            
        }
        
    }
    const handleValidation =()=>{
        const{password,username} = values;
        if(password === ""){
            toast.error("Passwords do not match",toastOptions);
            return false;
        }else if(username.length === ""){
            toast.error("Username is required",toastOptions);
            return false;
        }
        return true;
    }
    const handleChange = (event)=>{
        setValues({...values,[event.target.name]: event.target.value})
    }
    return (
            <div className="login">
                <div className="holder">    
                    <form className='loginForm' onSubmit={(event)=>handleSubmit(event)}> 
                        <div className="login"><h5>LOGIN</h5></div>
                        <input type="text" id="login" name="username" onChange={(e)=> handleChange(e)}></input><br></br><br></br>
                        <div className="password"><h5>Hasło</h5></div>
                        <input type="password" id="password" name="password" onChange={(e)=> handleChange(e)} ></input><br></br><br></br>
                        <input type="submit" value="Zaloguj"></input>
                    </form>
                </div>
            </div>
    );
}

export default Login;
