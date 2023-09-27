import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EditAccount = () => {
    const [book, setBook] = useState({
        id: "",
        username: "",
        password: "",
        role: "",
    })

    const navigate = useNavigate()
    const location = useLocation();
    
    const id =location.pathname.split("/")[2];

    const handleChange =(e) =>{
        setBook((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/account/${id}`, book)
            navigate("/account")
        } catch (error) {
           console.log(error) 
        }
    }

    console.log(book)
  return (
    <div className='form'>
        <h1>Sửa thông tin</h1>
        <input onChange={handleChange} type="text" placeholder='id' name='id'/>
        <input onChange={handleChange} type="text" placeholder='username' name='username'/>
        <input onChange={handleChange} type="text" placeholder='password' name='password'/>
        <input onChange={handleChange} type="text" placeholder='role' name='role'/>
        <button className='formButton' onClick={handleClick}>add</button>
        <div></div>
    </div>
  )
}

export default EditAccount