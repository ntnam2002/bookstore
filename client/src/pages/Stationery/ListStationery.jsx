import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ListStationery = () => {
    const [ books,setBooks ] = useState([])

    useEffect(()=>{
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8080/stationery")
                setBooks(res.data);
            } catch (err) {
                console.log(err)
            }
        }   
        fetchAllBooks();
    }, [])

    const handleDelete = async (sID) => {
        try {
            await axios.delete("http://localhost:8080/stationery/"+sID)
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }
//     // Lấy dữ liệu hình ảnh từ API (chuỗi base64)
// const imageData = book.img}; // Giả sử book.img chứa chuỗi base64 của hình ảnh

// // Tạo URL hình ảnh từ chuỗi base64
// const imageSrc = `data:image/png;base64,${imageData}`;

  return (
    <div className='listbook'>
        <h1>Văn phòng phảm Stationnery</h1>
        <div>
          <Link to="/CreateStationery" className='btn'>Thêm sách mới</Link>
        </div>
        <div className="books">
        <table className='managerBook-table'>
        <thead>
            <tr>
              <th>id</th>
              <th>img</th>
              <th>Name</th>
              <th>NCC ID</th>
              <th>KHO</th>
              <th>GIA</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, key) =>
              <tr key={key} >
                <td>{book.sID}</td>
                {/* <td>{book.img}</td> */}
                <td>noi nhét ảnh</td>
                {/* <td>  <img src={`/books/${book.img}`} alt={book.title} className="managerBook-img"/>  </td> */}
                <td>{book.name}</td>
                <td>{book.supplierID }</td>
                <td>{book.quantityInStock}</td>
                <td>{book.price}</td>
                <td>
                    <button className="update"><Link to ={`/EditStationery/${book.sID}`}>Update</Link></button>
                </td>
                <td>
                    <button className="delete" onClick={()=>handleDelete(book.sID)}>Delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default ListStationery