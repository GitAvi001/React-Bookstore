import express from "express"
import mysql from "mysql"
import cors from "cors"

const app=express()

const db=mysql.createConnection({
   
host:"root@localhost",
user:"root",
password:"MySQL###123@asd",
database:"test"

})

app.use(express.json())

app.use(cors())

app.listen(8800, ()=>{

    console.log("Connected to backend")

});


app.get("/", (req,res)=>{

    res.json("Hello! this is the backend");
})

app.put("/books/:id", (req,res)=>{

    const q="UPDATE books SET `title` =?, `desc`=?, `cover`=? WHERE id = ?";

    const values=[

        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover

    ]


    db.query(q, [...values,bookId], (err,data)=>{

    if(err) return res.json(err)

    return res.json("Book has been updated successfully")

    })
})



app.delete("/books/:id", (req,res)=>{

const bookId=req.params.id;

const q="DELETE FROM BOOKS WHERE id = ?"

db.query(q,(err,data)=>{

    if(err) return res.json(err)

    return res.json("Book has been deleted successfully")

    })

})

app.get("/books", (req,res)=>{

    const q="SELECT * FROM books"

    db.query(q,(err,data)=>{

    if(err) return res.json(err)

    return res.json(data)

    })
})

app.post("/books", (req,res)=>{


    const q="INSERT INTO books('title,'desc','price','cover') VALUES(?)"

    const values=
    [req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q,[values], (err,data)=>{


        if(err) return res.json(err)

        return res.json(data)


    })
})



