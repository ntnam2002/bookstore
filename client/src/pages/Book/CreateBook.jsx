import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'

const CreateBook = () => {
    const [book, setBook] = useState({
      img: "",
      name: "",
      authorName: "",
      genre: "",
      supplierID : "",
      quantityInStock: "",
      price: "",
    })

    const navigate = useNavigate()

    const [suppliers, setSuppliers] = useState([]); // Thêm state để lưu danh sách nhà cung cấp

    useEffect(() => {
      const fetchSuppliers = async () => {
        try {
          const response = await axios.get("http://192.168.243.80:8080/supplier"); // Thay đổi URL API để lấy dữ liệu nhà cung cấp
          setSuppliers(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchSuppliers();
    }, []);

    const handleChange =(e) =>{
      
        setBook((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            await axios.post("http://192.168.243.80:8080/books", book)
            navigate("/books")
        } catch (error) {
           console.log(error) 
        }
    }

    console.log(book)
  return (
    <div className='form'>
        <h1>Addd boook</h1>
        <input onChange={handleChange} type="text" placeholder='img' name='img'/>
        <input onChange={handleChange} type="text" placeholder='name' name='name'/>
        <input onChange={handleChange} type="text" placeholder='authorName' name='authorName'/>
        <input onChange={handleChange} type="text" placeholder='genre' name='genre'/>
        {/* <label>Chọn ID nhà cung cấp</label> */}
        <select onChange={handleChange} name="supplierID" value={book.supplierID}>
        <option value="">Chọn nhà cung cấp</option>
          {suppliers.map((supplier) => (
            <option key={supplier.supplierID} value={supplier.supplierID}>
              {supplier.supplierID}
            </option>
          ))}
        </select>

        <input onChange={handleChange} type="text" placeholder='quantityInStock' name='quantityInStock'/>
        <input onChange={handleChange} type="number" placeholder='price' name='price'/>
        <button className='formButton' onClick={handleClick}>add</button>
    </div>
  )
}

export default CreateBook