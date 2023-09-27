import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import "./Book.css"


const ListBook = () => {
    const [ books,setBooks ] = useState([])

    useEffect(()=>{
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8080/books")
                setBooks(res.data);
            } catch (err) {
                console.log(err)
            }
        }   
        fetchAllBooks();
    }, [])

    const handleDelete = async (bookID) => {
        try {
            await axios.delete("http://localhost:8080/books/"+bookID)
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
        <h1>Boook list</h1>
        <div>
          <Link to="/CreateBook" className='btn'>Thêm sách mới</Link>
        </div>
        <div className="books">
        <table className='managerBook-table'>
        <thead>
            <tr>
              <th>id</th>
              <th>img</th>
              <th>Name</th>
              <th>athorName</th>
              <th>Thể loại</th>
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
                <td>{book.bookID}</td>
                {/* <td>{book.img}</td> */}
                <td>noi nhét ảnh</td>
                {/* <td>  <img src={`/books/${book.img}`} alt={book.title} className="managerBook-img"/>  </td> */}
                <td>{book.name}</td>
                <td>{book.authorName}</td>
                <td>{book.genre}</td>
                <td>{book.supplierID }</td>
                <td>{book.quantityInStock}</td>
                <td>{book.price}</td>
                <td>
                    <button className="update"><Link to ={`/EditBook/${book.bookID}`}>Update</Link></button>
                </td>
                <td>
                    <button className="delete" onClick={()=>handleDelete(book.bookID)}>Delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default ListBook