import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateSupplier = () => {
    const [book, setBook] = useState({
      supplierID: "",
      supplierName: "",
      address: "",
      type: "",
    })

    const navigate = useNavigate()

    const handleChange =(e) =>{
      
        setBook((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/supplier", book)
            navigate("/supplier")
        } catch (error) {
           console.log(error) 
        }
    }

    console.log(book)
  return (
    <div className='form'>
        <h1>Thêm mới Nhà cung cấp</h1>
        <input onChange={handleChange} type="text" placeholder='supplierID' name='supplierID'/>
        <input onChange={handleChange} type="text" placeholder='supplierName' name='supplierName'/>
        <input onChange={handleChange} type="text" placeholder='address' name='address'/>
        <input onChange={handleChange} type="text" placeholder='type' name='type'/>
        <button className='formButton' onClick={handleClick}>add</button>
    </div>
  )
}

export default CreateSupplier