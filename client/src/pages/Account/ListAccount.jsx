import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ListAccount = () => {
    const [ books,setBooks ] = useState([])

    useEffect(()=>{
        const fetchAllBooks = async () => {
            try {
                // const res = await axios.get("http://192.168.243.80:8888/account")
                const res = await axios.get("http://192.168.1.11:8080/account")
                //cổng 8080
                setBooks(res.data);
            } catch (err) {
                console.log(err)
            }
        }   
        fetchAllBooks();
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://192.168.1.11:8080/account/"+id)
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='listbook'>
        <h1>Tài khoản</h1>
        <div>
          <Link to="/CreateAccount" className='btn'>Thêm Account mới</Link>
        </div>
        <div className="books">
        <table className='managerBook-table'>
        <thead>
            <tr>
              <th>id</th>
              <th>Account</th>
              <th>Password</th>
              <th>Role</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, key) =>
              <tr key={key} >
                <td>{book.id}</td>
                <td>{book.username}</td>
                <td>{book.password}</td>
                <td>{book.role}</td>
                <td>
                    <button className="update"><Link to ={`/EditAccount/${book.id}`}>Update</Link></button>
                </td>
                <td>
                    <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default ListAccount
