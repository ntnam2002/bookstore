import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'

const CreateAccount = () => {
    const [book, setBook] = useState({
      id: "",
      username: "",
      password: "",
      role: "",
    })

    const navigate = useNavigate()

    const handleChange =(e) =>{
      
        setBook((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            await axios.post("http://192.168.1.11:8080/account", book)
            navigate("/account")
        } catch (error) {
           console.log(error) 
        }
    }

    console.log(book)
  return (
    <div className='form'>
        <h1>Add Account</h1>
        <input onChange={handleChange} type="text" placeholder='id' name='id'/>
        <input onChange={handleChange} type="text" placeholder='username' name='username'/>
        <input onChange={handleChange} type="text" placeholder='password' name='password'/>
        <input onChange={handleChange} type="text" placeholder='role' name='role'/>
        <button className='formButton' onClick={handleClick}>Add</button>
    </div>
  )
}

export default CreateAccount