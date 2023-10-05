import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EditStationery = () => {
    const [book, setBook] = useState({
      img: "",
      name: "",
      supplierID : "",
      quantityInStock: "",
      price: "",
    })

    const [suppliers, setSuppliers] = useState([]); // Thêm state để lưu danh sách nhà cung cấp

    useEffect(() => {
      const fetchSuppliers = async () => {
        try {
          const response = await axios.get("http://192.168.243.80:8080/supplier"); 
          setSuppliers(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchSuppliers();
    }, []);

    const navigate = useNavigate()
    const location = useLocation();
    
    const sID =location.pathname.split("/")[2];

    const handleChange =(e) =>{
        setBook((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            await axios.put(`http://192.168.243.80:8080/stationery/${sID}`, book)
            navigate("/stationery")
        } catch (error) {
           console.log(error) 
        }
    }

    console.log(book)
  return (
    <div className='form'>
        <h1>Sửa thông tin</h1>
        <input onChange={handleChange} type="text" placeholder='img' name='img'/>
        <input onChange={handleChange} type="text" placeholder='name' name='name'/>
        {/* <input onChange={handleChange} type="text" placeholder='supplierID' name='supplierID'/> */}
        {/* <label>Chọn ID nhà cung cấp</label> */}
        <select onChange={handleChange} name="supplierID" value={book.supplierID} >
        <option value="">Chọn nhà cung cấp</option>
          {suppliers.map((supplier) => (
            <option key={supplier.supplierID} value={supplier.supplierID}>
              {supplier.supplierID}
            </option>
          ))}
        </select>
        <input onChange={handleChange} type="text" placeholder='quantityInStock' name='quantityInStock'/>
        <input onChange={handleChange} type="number" placeholder='price' name='price'/>
        <button className='formButton' onClick={handleClick}>Add</button>
        {/* <Link className='formButton' to="/books">Xem danh sách Sách</Link> */}
        <div></div>
    </div>
  )
}


export default EditStationery