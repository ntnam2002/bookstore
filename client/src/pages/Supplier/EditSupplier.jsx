import axios from 'axios'
import React, { useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EditSupplier = () => {
    const [book, setBook] = useState({
      supplierID: "",
      supplierName: "",
      address: "",
      type: "",
    })

    const navigate = useNavigate()
    const location = useLocation();
    
    const supplierID =location.pathname.split("/")[2];

    const handleChange =(e) =>{
        setBook((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            await axios.put(`http://10.40.27.192:8080/supplier/${supplierID}`, book)
            navigate("/supplier")
        } catch (error) {
           console.log(error) 
        }
    }

    console.log(book)
  return (
    <div className='form'>
        <h1>Sửa thông tin nhà cung cấp</h1>
        <input onChange={handleChange} type="text" placeholder='supplierID' name='supplierID'/>
        <input onChange={handleChange} type="text" placeholder='supplierName' name='supplierName'/>
        <input onChange={handleChange} type="text" placeholder='address' name='address'/>
        <input onChange={handleChange} type="text" placeholder='type' name='type'/>
        <button className='formButton' onClick={handleClick}>add</button>
        <div></div>
    </div>
  )
}

export default EditSupplier