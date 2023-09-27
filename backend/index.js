    import express  from "express"
    import mysql from "mysql"
    import cors from "cors"

    const app = express();

    const db = mysql.createConnection({
        host: "localhost",
        user:"root",
        password:"",
        database: 'bookstore'
    });

    app.use(express.json())
    app.use(cors())

    app.get('/', (req, res) => {
        res.json("hello hinahasdas")
    });


    // GET LẤY DỮ LIỆU
    app.get("/books", (req, res) => {
        const q = "SELECT * FROM book"
        db.query(q, (err,data) =>{
            if(err) return res.json(err)
            return res.json(data)
        });
    });
    //================================================================
    app.get("/supplier", (req, res) => {
        const q = "SELECT * FROM supplier"
        db.query(q, (err,data) =>{
            if(err) return res.json(err)
            return res.json(data)
        });
    });
    //================================================================
    app.get("/stationery", (req, res) => {
        const q = "SELECT * FROM stationery"
        db.query(q, (err,data) =>{
            if(err) return res.json(err)
            return res.json(data)
        });
    });
    //================================================================
    app.get("/account", (req, res) => {
        const q = "SELECT * FROM account"
        db.query(q, (err,data) =>{
            if(err) return res.json(err)
            return res.json(data)
        });
    });


    //POST THÊM MỚI 
    app.post("/books", (req, res) => {
        const supplierID = req.body.supplierID; // Lấy giá trị supplierID từ yêu cầu

        // Truy vấn SQL để chèn dữ liệu vào bảng book
        const insertBookQuery = "INSERT INTO book (`img`, `name`, `authorName`, `genre`, `supplierID`, `quantityInStock`, `price`) VALUES (?, ?, ?, ?, ?, ?, ?)";

        const values = [
            req.body.img,
            req.body.name,
            req.body.authorName,
            req.body.genre,
            supplierID, // Sử dụng supplierID từ yêu cầu
            req.body.quantityInStock,
            req.body.price,
        ];

        db.query(insertBookQuery, values, (err, data) => {
            if (err) {
                console.error(err);
                return res.json(err);
            }
            return res.json("Book đã được thêm thành công");
        });
    });
    //================================================================================================================================
    app.post("/supplier", (req, res) => {
        const q = "INSERT INTO supplier (`supplierID`, `supplierName`, `address`, `type`)  VALUES (?, ?, ?, ?)";

        const values = [
            req.body.supplierID,
            req.body.supplierName,
            req.body.address,
            req.body.type,
        ];

        db.query(q, values, (err, data) => {
            if (err) {
                console.error(err);
                return res.json(err);
            }
            return res.json("Nhà cung cấp đã được thêm thành công");
        });
    });
    //================================================================================================================================
    app.post("/stationery", (req, res) => {
        const supplierID = req.body.supplierID;
        const q = "INSERT INTO stationery (`img`, `name`, `supplierID`, `quantityInStock`, `price`)  VALUES (?, ?, ?, ?, ?)";

        const values = [
            req.body.img,
            req.body.name,
            supplierID,
            req.body.quantityInStock,
            req.body.price,
        ];

        db.query(q, values, (err, data) => {
            if (err) {
                console.error(err);
                return res.json(err);
            }
            return res.json("Văn phòng phẩm đã được thêm thành công");
        });
    });
    //================================================================================================================================
    app.post("/account", (req, res) => {
        const q = "INSERT INTO account (`id`, `username`, `password`, `role`)  VALUES (?, ?, ?, ?)";

        const values = [
            req.body.id,
            req.body.username,
            req.body.password,
            req.body.role,
        ];

        db.query(q, values, (err, data) => {
            if (err) {
                console.error(err);
                return res.json(err);
            }
            return res.json("Tài khoản đã được thêm thành công");
        });
    });


    // DELETE
    app.delete("/books/:bookID", (req, res) =>{
        const bookId = req.params.bookID;
        const q = "DELETE FROM book WHERE bookID = ?"

        db.query(q, [bookId], (err,data) =>{
            if(err) return res.json(err)
            return res.json("Book da dươc XOA thanh cong");
        });
    })
    //================================================================
    app.delete("/supplier/:supplierID", (req, res) =>{
        const supplierID = req.params.supplierID;
        const q = "DELETE FROM supplier WHERE supplierID = ?"

        db.query(q, [supplierID], (err,data) =>{
            if(err) return res.json(err)
            return res.json("Nhà cung cấp da dươc XOA thanh cong");
        });
    })
    //================================================================
    app.delete("/stationery/:sID", (req, res) =>{
        const sID = req.params.sID;
        const q = "DELETE FROM stationery WHERE sID = ?"

        db.query(q, [sID], (err,data) =>{
            if(err) return res.json(err)
            return res.json("Văn phòng phẩm da dươc XOA thanh cong");
        });
    })
    //================================================================
    app.delete("/account/:id", (req, res) =>{
        const id = req.params.id;
        const q = "DELETE FROM account WHERE id = ?"

        db.query(q, [id], (err,data) =>{
            if(err) return res.json(err)
            return res.json("Tài khoản da dươc XOA thanh cong");
        });
    })



    // PUT SỬA DỮ LIỆU
    app.put("/books/:bookID", (req, res) =>{
        const supplierID = req.body.supplierID;
        const bookId = req.params.bookID;
        const q = "UPDATE book SET `img` = ?, `name` = ?, `authorName` = ?, `genre` = ?, `supplierID` = ?, `quantityInStock` = ?, `price`  = ? WHERE bookID = ?" 

        const values = [
            req.body.img,
            req.body.name,
            req.body.authorName,
            req.body.genre,
            supplierID, 
            req.body.quantityInStock,
            req.body.price,
        ]

        db.query(q, [...values,bookId], (err,data) =>{
            if(err) return res.json(err)
            return res.json("Book da dươc update thanh cong");
        });
    })

    //================================================================================================================================
    app.put("/supplier/:supplierID", (req, res) =>{
        const supplierID = req.params.supplierID;
        const q = "UPDATE supplier SET `supplierName` = ?, `address` = ?, `type` = ? WHERE supplierID = ?" 

        const values = [
            req.body.supplierName,
            req.body.address,
            req.body.type
        ]

        db.query(q, [...values,supplierID], (err,data) =>{
            if(err) return res.json(err)
            return res.json("Nhà cung cấp da dươc update thanh cong");
        });
    })
    //================================================================
    app.put("/stationery/:sID", (req, res) =>{
        const supplierID = req.body.supplierID;
        const sID = req.params.sID;
        const q = "UPDATE stationery SET `img` = ?, `name` = ?, `supplierID` = ?, `quantityInStock` = ?, `price` = ? WHERE sID = ?" 

        const values = [
            req.body.img,
            req.body.name,
            supplierID, 
            req.body.quantityInStock,
            req.body.price,
        ]

        db.query(q, [...values,sID], (err,data) =>{
            if(err) return res.json(err)
            return res.json("Văn phòng phẩm da dươc update thanh cong");
        });
    })
    //================================================================
    app.put("/account/:id", (req, res) =>{
        const id = req.params.id;
        const q = "UPDATE account SET `username` = ?, `password` = ?, `role` = ? WHERE id = ?" 

        const values = [
            req.body.username,
            req.body.password,
            req.body.role,
        ]

        db.query(q, [...values,id], (err,data) =>{
            if(err) return res.json(err)
            return res.json("Tài khoản da dươc update thanh cong");
        });
    })


    app.listen(8000, ()=>{
        console.log("connecting 1")
    });