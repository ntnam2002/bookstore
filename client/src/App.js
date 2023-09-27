
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import "./style.css"
import ListBook from "./pages/Book/ListBook";
import CreateBook from "./pages/Book/CreateBook";
import EditBook from "./pages/Book/EditBook";
import ListSupplier from "./pages/Supplier/ListSupplier";
import CreateSupplier from "./pages/Supplier/CreateSupplier";
import EditSupplier from "./pages/Supplier/EditSupplier";
import ListStationery from "./pages/Stationery/ListStationery";
import CreateAccount from "./pages/Account/CreateAccount";
import ListAccount from "./pages/Account/ListAccount";
import EditAccount from "./pages/Account/EditAccount";
import CreateStationery from "./pages/Stationery/CreateStationery";
import EditStationery from "./pages/Stationery/EditStationery";
import Home from "./pages/Home/Home";
import React from "react";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar">
            <ul className="navbar-links">
                <Link to="/" className="navbar-link">Trang chủ</Link>
                <Link to="/books" className="navbar-link">Danh sách Sách</Link>
                <Link to="/supplier" className="navbar-link">Nhà cung cấp</Link>
                <Link to="/stationery" className="navbar-link">Văn phòng phẩm</Link>
                <Link to="/account" className="navbar-link">Tài khoản</Link>

            </ul>
        </nav>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/books" element={<ListBook/>}/>
              <Route path="/CreateBook" element={<CreateBook/>}/>
              <Route path="/EditBook/:bookID" element={<EditBook/>}/>

              <Route path="/supplier" element={<ListSupplier/>}/>
              <Route path="/CreateSupplier" element={<CreateSupplier/>}/>
              <Route path="/EditSupplier/:supplierID" element={<EditSupplier/>}/>

              <Route path="/stationery" element={<ListStationery/>}/>
              <Route path="/CreateStationery" element={<CreateStationery/>}/>
              <Route path="/EditStationery/:sID" element={<EditStationery/>}/>

              <Route path="/account" element={<ListAccount/>}/>
              <Route path="/CreateAccount" element={<CreateAccount/>}/>
              <Route path="/EditAccount/:id" element={<EditAccount/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
