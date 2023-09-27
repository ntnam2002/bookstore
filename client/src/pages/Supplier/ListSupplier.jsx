import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const ListSupplier = () => {
    const [ books,setBooks ] = useState([])

    useEffect(()=>{
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8080/supplier")
                setBooks(res.data);
            } catch (err) {
                console.log(err)
            }
        }   
        fetchAllBooks();
    }, [])

    const handleDelete = async (supplierID) => {
        try {
            await axios.delete("http://localhost:8080/supplier/"+supplierID)
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='listbook'>
        <h1>Nhà cung cấp list</h1>
        <div>
          <Link to="/CreateSupplier" className='btn'>Thêm nhà cung cấp mới</Link>
        </div>
        <div className="books">
        <table className='managerBook-table'>
        <thead>
            <tr>
              <th>ID nhà cung cấp</th>
              <th>Tên nhà cung cấp</th>
              <th>Địa chỉ</th>
              <th>Thể loại</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, key) =>
              <tr key={key} >
                <td>{book.supplierID}</td>
                <td>{book.supplierName}</td>
                <td>{book.address}</td>
                <td>{book.type}</td>
                <td>
                    <button className="update"><Link to ={`/EditSupplier/${book.supplierID}`}>Update</Link></button>
                </td>
                <td>
                    <button className="delete" onClick={()=>handleDelete(book.supplierID)}>Delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default ListSupplier